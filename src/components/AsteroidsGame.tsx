"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

// Game Constants
const PLAYER_SIZE = 20;
const PLAYER_ROTATION_SPEED = 0.08;
const PLAYER_THRUST = 0.05;
const PLAYER_FRICTION = 0.99;
const BULLET_SPEED = 7;
const BULLET_LIFESPAN = 60; // frames
const ASTEROID_SPEED = 1;
const ASTEROID_SIZE_MIN = 20;
const ASTEROID_SIZE_MAX = 60;
const NUM_ASTEROIDS = 5;

interface GameObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Player extends GameObject {
  angle: number;
  thrusting: boolean;
  rotatingLeft: boolean;
  rotatingRight: boolean;
  bullets: Bullet[];
}

interface Bullet extends GameObject {
  lifespan: number;
}

interface Asteroid extends GameObject {}

interface AsteroidsGameProps {
  onScoreChange: (score: number) => void;
  onGameOver: (isOver: boolean) => void;
}

const AsteroidsGame: React.FC<AsteroidsGameProps> = ({ onScoreChange, onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const playerRef = useRef<Player>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: PLAYER_SIZE / 2,
    angle: 0,
    thrusting: false,
    rotatingLeft: false,
    rotatingRight: false,
    bullets: [],
    color: "#2563eb", // Blue color for the ship
  });
  const asteroidsRef = useRef<Asteroid[]>([]);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const currentScore = useRef(0);
  const gameIsOver = useRef(false);

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    playerRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      radius: PLAYER_SIZE / 2,
      angle: Math.PI / 2, // Pointing upwards
      thrusting: false,
      rotatingLeft: false,
      rotatingRight: false,
      bullets: [],
      color: "#2563eb", // Blue color for the ship
    };

    asteroidsRef.current = [];
    for (let i = 0; i < NUM_ASTEROIDS; i++) {
      spawnAsteroid(canvas.width, canvas.height);
    }

    currentScore.current = 0;
    onScoreChange(0);
    gameIsOver.current = false;
    onGameOver(false);
  }, [onScoreChange, onGameOver]);

  const spawnAsteroid = useCallback((width: number, height: number) => {
    let x, y;
    // Spawn asteroid outside a safe zone around the player
    const safeZoneRadius = Math.max(width, height) / 4;
    const playerX = playerRef.current.x;
    const playerY = playerRef.current.y;

    do {
      x = Math.random() * width;
      y = Math.random() * height;
    } while (Math.sqrt((x - playerX)**2 + (y - playerY)**2) < safeZoneRadius);

    const radius = Math.random() * (ASTEROID_SIZE_MAX - ASTEROID_SIZE_MIN) + ASTEROID_SIZE_MIN;
    const angle = Math.random() * Math.PI * 2;
    const speed = ASTEROID_SPEED + Math.random() * 0.5; // Slightly varied speed

    asteroidsRef.current.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius,
      color: "white", // White color for asteroids
    });
  }, []);

  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, player: Player) => {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);

    ctx.strokeStyle = player.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -player.radius); // Nose
    ctx.lineTo(-player.radius * 0.75, player.radius); // Bottom-left
    ctx.lineTo(player.radius * 0.75, player.radius); // Bottom-right
    ctx.closePath();
    ctx.stroke();

    // Draw thrust flame if thrusting
    if (player.thrusting) {
      ctx.fillStyle = "orange";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-player.radius * 0.5, player.radius * 1.2);
      ctx.lineTo(0, player.radius * 2);
      ctx.lineTo(player.radius * 0.5, player.radius * 1.2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }, []);

  const drawAsteroid = useCallback((ctx: CanvasRenderingContext2D, asteroid: Asteroid) => {
    ctx.strokeStyle = asteroid.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  const drawBullet = useCallback((ctx: CanvasRenderingContext2D, bullet: Bullet) => {
    ctx.fillStyle = bullet.color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameIsOver.current) return;

    const player = playerRef.current;
    const asteroids = asteroidsRef.current;

    // Player rotation
    if (player.rotatingLeft) {
      player.angle -= PLAYER_ROTATION_SPEED;
    }
    if (player.rotatingRight) {
      player.angle += PLAYER_ROTATION_SPEED;
    }

    // Player thrust
    if (player.thrusting) {
      player.vx += Math.cos(player.angle - Math.PI / 2) * PLAYER_THRUST;
      player.vy += Math.sin(player.angle - Math.PI / 2) * PLAYER_THRUST;
    }

    // Apply friction
    player.vx *= PLAYER_FRICTION;
    player.vy *= PLAYER_FRICTION;

    // Update player position
    player.x += player.vx;
    player.y += player.vy;

    // Wrap player around screen
    if (player.x < 0 - player.radius) player.x = canvas.width + player.radius;
    if (player.x > canvas.width + player.radius) player.x = 0 - player.radius;
    if (player.y < 0 - player.radius) player.y = canvas.height + player.radius;
    if (player.y > canvas.height + player.radius) player.y = 0 - player.radius;

    // Update bullets
    player.bullets = player.bullets.filter((bullet) => {
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      bullet.lifespan--;

      // Wrap bullets around screen
      if (bullet.x < 0) bullet.x = canvas.width;
      if (bullet.x > canvas.width) bullet.x = 0;
      if (bullet.y < 0) bullet.y = canvas.height;
      if (bullet.y > canvas.height) bullet.y = 0;

      return bullet.lifespan > 0;
    });

    // Update asteroids
    asteroids.forEach((asteroid) => {
      asteroid.x += asteroid.vx;
      asteroid.y += asteroid.vy;

      // Wrap asteroids around screen
      if (asteroid.x < 0 - asteroid.radius) asteroid.x = canvas.width + asteroid.radius;
      if (asteroid.x > canvas.width + asteroid.radius) asteroid.x = 0 - asteroid.radius;
      if (asteroid.y < 0 - asteroid.radius) asteroid.y = canvas.height + asteroid.radius;
      if (asteroid.y > canvas.height + asteroid.radius) asteroid.y = 0 - asteroid.radius;
    });

    // Collision detection: Bullet vs Asteroid
    for (let i = player.bullets.length - 1; i >= 0; i--) {
      const bullet = player.bullets[i];
      for (let j = asteroids.length - 1; j >= 0; j--) {
        const asteroid = asteroids[j];
        const dist = Math.sqrt((bullet.x - asteroid.x)**2 + (bullet.y - asteroid.y)**2);
        if (dist < bullet.radius + asteroid.radius) {
          // Collision! Remove bullet and asteroid
          player.bullets.splice(i, 1);
          asteroids.splice(j, 1);
          currentScore.current += 10;
          onScoreChange(currentScore.current); // Notify parent of score change
          // Spawn a new asteroid to replace the destroyed one
          spawnAsteroid(canvas.width, canvas.height);
          break; // Break inner loop as bullet is removed
        }
      }
    }

    // Collision detection: Player vs Asteroid
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];
      const dist = Math.sqrt((player.x - asteroid.x)**2 + (player.y - asteroid.y)**2);
      if (dist < player.radius + asteroid.radius) {
        // Game Over!
        gameIsOver.current = true;
        onGameOver(true); // Notify parent of game over
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        break;
      }
    }
  }, [onScoreChange, onGameOver]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    updateGame();

    // Draw everything
    drawPlayer(ctx, playerRef.current);
    asteroidsRef.current.forEach((asteroid) => drawAsteroid(ctx, asteroid));
    playerRef.current.bullets.forEach((bullet) => drawBullet(ctx, bullet));

    if (!gameIsOver.current) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  }, [updateGame, drawPlayer, drawAsteroid, drawBullet]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keysPressed.current[e.code] = true;
    const player = playerRef.current;

    if (e.code === "ArrowUp" || e.code === "KeyW") {
      player.thrusting = true;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
      player.rotatingLeft = true;
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      player.rotatingRight = true;
    }
    if (e.code === "Space" && !gameIsOver.current) {
      e.preventDefault(); // Prevent scrolling
      player.bullets.push({
        x: player.x + Math.cos(player.angle - Math.PI / 2) * player.radius,
        y: player.y + Math.sin(player.angle - Math.PI / 2) * player.radius,
        vx: player.vx + Math.cos(player.angle - Math.PI / 2) * BULLET_SPEED,
        vy: player.vy + Math.sin(player.angle - Math.PI / 2) * BULLET_SPEED,
        radius: 2,
        lifespan: BULLET_LIFESPAN,
        color: "white", // White color for bullets
      });
    }
    if (e.code === "KeyR" && gameIsOver.current) {
      initGame();
      gameLoop();
    }
  }, [initGame, gameLoop]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current[e.code] = false;
    const player = playerRef.current;

    if (e.code === "ArrowUp" || e.code === "KeyW") {
      player.thrusting = false;
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
      player.rotatingLeft = false;
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      player.rotatingRight = false;
    }
  }, []);

  useEffect(() => {
    initGame();
    gameLoop();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        // Re-initialize game on resize to adjust positions
        initGame();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [initGame, gameLoop, handleKeyDown, handleKeyUp]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full bg-transparent"></canvas>
    </div>
  );
};

export default AsteroidsGame;