"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AsteroidsGame from "./AsteroidsGame"; // Import the new AsteroidsGame component

const ContactSection: React.FC = () => {
  const [gameScore, setGameScore] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  return (
    <section className="relative py-12 bg-gradient-to-br from-blue-700 to-purple-800 text-white h-full flex flex-col justify-between items-center overflow-hidden">
      {/* Asteroids game background */}
      <AsteroidsGame onScoreChange={setGameScore} onGameOver={setGameIsOver} />

      {/* Overlay to make text readable over the game */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Centered Game Over/Score Message */}
      {(gameIsOver || gameScore > 0) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg font-mono z-30 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          {gameIsOver ? (
            <>
              <h3 className="text-2xl font-bold mb-2">GAME OVER</h3>
              <p className="text-xl mb-2">Final Score: {gameScore}</p>
              <p className="text-base">Press 'R' to Restart</p>
            </>
          ) : (
            <p>Score: {gameScore}</p>
          )}
        </div>
      )}

      {/* Main Contact Content */}
      <div className="container mx-auto px-4 text-center flex flex-col items-center relative z-20 text-white">
        <h2 className="text-3xl font-bold mb-8 text-gray-100 opacity-0 animate-fade-in-up">Get in Touch</h2>
        <p className="text-lg mb-8 max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Have a project idea or just want to say hello? Feel free to reach out!
        </p>
        <a
          href="mailto:contact@maxabardo.work"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg opacity-0 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Email Me
        </a>
      </div>

      {/* Mini-game instruction at bottom right */}
      <div className="absolute bottom-24 right-4 z-30 text-right opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <p className="text-sm text-gray-300">(You can play a mini-game while you're here!)</p>
      </div>

      <div className="container mx-auto px-4 text-center mt-auto relative z-20 text-white">
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