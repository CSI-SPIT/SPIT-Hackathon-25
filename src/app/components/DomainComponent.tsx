"use client";
import React from 'react';
import Tablet from "./Tablet";

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
            <div className="flex flex-row items-center justify-center h-[80vh]">
                <Tablet />
            </div>
        </div>
    );
};

export default DomainComponent;

// tablet is nested in this