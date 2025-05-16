import React from "react";
import { Link } from "react-router-dom";

const HomeSection = ({ imageUrl, heading, subText, buttonText, linkTo }) => {
  return (
    <div
      className="relative flex items-center justify-center w-full min-h-screen text-white"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: imageUrl ? "transparent" : "#e0e0e0",
      }}
    >
      {/* 어두운 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
          {heading}
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-sm">{subText}</p>
        <Link to={linkTo}>
          <button className="border border-white text-white py-3 px-8 text-lg bg-transparent hover:bg-white/90 hover:text-black transition duration-300 shadow-lg">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeSection;
