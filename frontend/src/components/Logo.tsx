import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      {/* Comic Starburst Background */}
      <path
        d="M50 5 L60 30 L85 20 L75 45 L100 60 L75 70 L85 95 L60 80 L50 100 L40 80 L15 95 L25 70 L0 60 L25 45 L15 20 L40 30 Z"
        fill="url(#logo-grad)"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Book base */}
      <path
        d="M30 65 L50 75 L70 65 L70 40 L50 30 L30 40 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Book middle line */}
      <path
        d="M50 30 L50 75"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Graduation Cap Top */}
      <path
        d="M50 20 L75 35 L50 50 L25 35 Z"
        fill="#4B0082"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Tassel cord */}
      <path
        d="M50 35 L75 40 L75 55"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tassel end */}
      <circle
        cx="75"
        cy="58"
        r="4"
        fill="#FF1493"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Logo;
