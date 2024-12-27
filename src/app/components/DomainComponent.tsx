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
const GameControllerBg: React.FC<{children:React.ReactNode}> = ({children})=>{
    return (
        <div
           style={{
               backgroundImage: "url('/nintendo.png')",
               backgroundSize: "contain",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "center",
               width: "100%", 
               maxWidth: "900px", // Reduced from 1200px
               aspectRatio: "16/9",
               position: "relative",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               transform: "scale(0.85)" // Added scale down
           }}
       >
           <div className="w-[85%] h-[60%] flex items-center justify-center" style={{ 
               position: "absolute",
               top: "20%",
               transform: "scale(0.7)" // Scaled down tablet content
           }}>
               {children}
           </div>
       </div>
    )
}

export default DomainComponent;

// tablet is nested in this