"use client";
import React from 'react';
import Tablet from "./Tablet";
import TechWeek from './TechWeek';

const DomainComponent: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/intro1.svg')",
        backgroundPosition: "50% 0",
        backgroundRepeat: "repeat-x",
        backgroundSize: "33px",
        backgroundAttachment: "scroll",
        paddingBottom: 0,
        minHeight: "60vh",
        backgroundColor: "#22B14C",
      }}
    >
      <div className='h-[30vh] w-full'></div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <GameControllerBg>
          <Tablet />
        </GameControllerBg>
        <div className="mt-14">
          <TechWeek />
        </div>
      </div>
    </div>
  );
};

//background image of controller
const GameControllerBg: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    //     <div
    //         className="hidden md:flex"
    //        style={{
    //            backgroundImage: "url('/Console.png')",
    //            backgroundSize: "contain",
    //            backgroundRepeat: "no-repeat",
    //            backgroundPosition: "center",
    //            width: "100%", 
    //            maxWidth: "1150px", // Reduced from 1200px
    //            aspectRatio: "16/9",
    //            position: "relative",
    //            display: "flex",
    //            alignItems: "center",
    //            justifyContent: "center",
    //            transform: "scale(0.9)" // Added scale down
    //        }}
    //    >
    //        <div className="w-[85%] h-[60%] flex items-center justify-center" style={{ 
    //            position: "absolute",
    //            top: "18%",
    //            left:"7.05%",
    //            transform: "scale(0.75)" // Scaled down tablet content
    //        }}>
    //            {children}
    //        </div>
    //    </div>
    <div
      className="bg-none lg:bg-[url('/Console.png')] bg-contain bg-no-repeat bg-center w-full max-w-[1350px] aspect-[16/9] relative flex items-center justify-center"
    >
      <div
        className="w-full left-[0%] lg:w-[50%] h-[70%] flex items-center justify-center absolute top-[13%] lg:left-[24.6%] scale-[0.85]"
      >
        {children}
      </div>
    </div>
  )
}

export default DomainComponent;

// tablet is nested in this