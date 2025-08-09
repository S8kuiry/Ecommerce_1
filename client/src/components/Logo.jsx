import React from "react";

const Logo = ({ width = 200, height = 80 }) => (
  <div className="logo-wrapper">
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3b82f6" />     {/* blue */}
          <stop offset="50%" stopColor="#ec4899" />    {/* pink */}
          <stop offset="75%" stopColor="#ef55f7ff" />    {/* violet */}
          <stop offset="100%" stopColor="#8e35c9ff" />   {/* dark violet */}
        </linearGradient>
      </defs>

      <path
        d="M 40 60 
           C 40 20, 80 20, 80 60 
           C 80 100, 120 100, 120 60"
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M 80 60
           C 80 20, 120 20, 120 60"
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <text
        x="140"
        y="85"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize="52"
        fill="url(#gradient1)"
        letterSpacing="4"
      >
        SUBHARTHY
      </text>
    </svg>
  </div>
);

export default Logo;
