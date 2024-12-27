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
                <Tablet />
                <div className="my-14">
                    <TechWeek />
                </div>
            </div>
        </div>
    );
};

export default DomainComponent;

// tablet is nested in this