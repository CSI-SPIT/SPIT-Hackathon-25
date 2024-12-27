"use client";
import React from 'react';
import styles from './PokemonTimeline.module.css'

const Sponsors: React.FC = () => {
    return (
        <div
            style={{
                backgroundImage: "url('/intro2.svg')",
                backgroundPosition: "50% 0",
                backgroundRepeat: "repeat-x",
                backgroundSize: "33px",
                backgroundAttachment: "scroll",
                paddingBottom: 0,
                minHeight: "60vh",
                backgroundColor: "#3F48CC",
            }}
        >
            <div className='h-[30vh] w-full'></div>
            <div className="flex flex-col items-center min-h-screen">
                <div className={styles.title}> Sponsors </div>
            </div>
        </div>
    );
};

export default Sponsors;