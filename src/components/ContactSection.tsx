"use client";

import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AsteroidsGame from "./AsteroidsGame";
import MobileGameControls from "./MobileGameControls"; // Import MobileGameControls
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile

const ContactSection: React.FC = () => {
  const [gameScore, setGameScore] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);
  const isMobile = useIsMobile(); // Determine if on mobile

  // States for mobile controls
  const [mobileThrusting, setMobileThrusting] = useState(false);
  const [mobileRotatingLeft, setMobileRotatingLeft] = useState(false);
  const [mobileRotatingRight, setMobileRotatingRight] = useState(false);
  const [mobileShootTrigger, setMobileShootTrigger] = useState(0); // Counter for shoot button presses
  const [mobileRestartTrigger, setMobileRestartTrigger] = useState(0); // Counter for restart button presses

  const handleThrustStart = useCallback(() => setMobileThrusting(true), []);
  const handleThrustEnd = useCallback(() => setMobileThrusting(false), []);
  const handleRotateLeftStart = useCallback(() => setMobileRotatingLeft(true), []);
  const handleRotateLeftEnd = useCallback(() => setMobileRotatingLeft(false), []);
  const handleRotateRightStart = useCallback(() => setMobileRotatingRight(true), []);
  const handleRotateRightEnd = useCallback(() => setMobileRotatingRight(false), []);
  const handleShoot = useCallback(() => setMobileShootTrigger(prev => prev + 1), []);
  const handleRestartGame = useCallback(() => {
    setGameIsOver(false); // Reset game over state
    setGameScore(0); // Reset score
    setMobileRestartTrigger(prev => prev + 1); // Trigger restart in game component
  }, []);

  return (
    <section className="relative py-12 bg-gradient-to-br from-blue-700 to-purple-800 text-white h-full flex flex-col justify-between items-center overflow-hidden">
      {/* Asteroids game background */}
      <AsteroidsGame
        onScoreChange={setGameScore}
        onGameOver={setGameIsOver}
        // Pass mobile control states/triggers to the game
        isThrusting={mobileThrusting}
        isRotatingLeft={mobileRotatingLeft}
        isRotatingRight={mobileRotatingRight}
        shootTrigger={mobileShootTrigger}
        restartTrigger={mobileRestartTrigger}
      />

      {/* Overlay to make text readable over the game */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content of the Contact Section */}
      <div className="container mx-auto px-4 text-center flex flex-col items-center relative z-20 text-white">
        <h2 className="text-3xl font-bold mb-2 text-gray-100 opacity-0 animate-fade-in-up">Feel free to reach out</h2>
        <p className="text-lg mb-8 max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          or take a quick break😉
        </p>
        {/* Removed: <p className="text-lg mb-8 max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Have a project idea or just want to say hello? Feel free to reach out!
        </p> */}
        <a
          href="mailto:contact@maxabardo.work"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg opacity-0 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Email Me
        </a>
        {/* Score keeper and Game Over message */}
        <div className="mt-4 text-white text-lg font-mono z-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          {gameIsOver ? (
            <>
              <p className="text-xl mb-2">Final Score: {gameScore}</p>
              <p className="text-base mb-2">Press 'R' to Restart</p>
              <h3 className="text-2xl font-bold">Oops, break over!</h3>
            </>
          ) : (
            <p>Score: {gameScore}</p>
          )}
        </div>
      </div>

      {/* Game Instructions */}
      {!isMobile && ( // Only show keyboard instructions on non-mobile
        <div className="text-white text-sm md:text-base font-mono z-20 mt-auto mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          <p>"WASD" to move | "Space" to shoot</p>
        </div>
      )}

      {/* Mobile Game Controls */}
      {isMobile && (
        <MobileGameControls
          onThrustStart={handleThrustStart}
          onThrustEnd={handleThrustEnd}
          onRotateLeftStart={handleRotateLeftStart}
          onRotateLeftEnd={handleRotateLeftEnd}
          onRotateRightStart={handleRotateRightStart}
          onRotateRightEnd={handleRotateRightEnd}
          onShoot={handleShoot}
          isGameOver={gameIsOver}
          onRestart={handleRestartGame}
        />
      )}

      <div className="container mx-auto px-4 text-center relative z-20 text-white">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="https://www.dyad.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Made with Dyad
          </a>
          <span className="hidden md:inline-block">|</span>
          <Link
            to="/terms-and-conditions"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Terms and Conditions
          </Link>
          <span className="hidden md:inline-block">|</span>
          <Link
            to="/privacy-policy"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Max's Dev Portfolio. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ContactSection;