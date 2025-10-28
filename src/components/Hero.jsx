import React from "react"; 

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" 
    className="relative flex flex-col items-center justify-center text-center py-15 px-6 bg-blue-50 overflow-hidden mt-18">

      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-300 rounded-full opacity-50 blur-xl animate-bounce"
      />

      {/* Hero Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          Simplify Your Support Workflow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Manage, track, and resolve customer issues efficiently with{" "}
          <span className="text-blue-600 font-semibold">TicketMgr</span> — your
          all-in-one support ticket management system.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105">
            Get Started
          </Link>
          
          <Link
            to="/auth/login" className="border border-blue-600 bg-blue-200 text-blue-900 px-8 py-3 rounded-xl shadow-sm hover:bg-blue-100 hover:text-blue-600 transition-transform transform hover:scale-105">
            Login
          </Link>
        </div>
      </div>

      {/* Wavy SVG background */}
      <svg
        className="absolute bottom-0 left-0 w-full z-0"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft gradient background wave */}
        <defs>
          <linearGradient id="modernWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Main gradient wave */}
        <path
          fill="url(#modernWave)"
          fillOpacity="1"
          d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,192C672,192,768,160,864,144C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224V320H0Z"
        ></path>

        {/* Second wave */}
        <path
          fill="#93C5FD"
          fillOpacity="0.45"
          d="M0,288L48,282.7C96,277,192,267,288,266.7C384,267,480,277,576,282.7C672,288,768,288,864,272C960,256,1056,224,1152,181.3C1248,139,1344,85,1392,58.7L1440,32V320H0Z"
        ></path>

        {/* Third wave */}
        <path
          fill="#60A5FA"
          fillOpacity="0.4"
          d="M0,256L60,240C120,224,240,192,360,197.3C480,203,600,245,720,245.3C840,245,960,203,1080,181.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      
    </section>
  );
}


