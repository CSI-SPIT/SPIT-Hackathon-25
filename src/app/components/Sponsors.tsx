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
            <div className='h-[20vh] w-full'></div>
            <div className="flex flex-col items-center min-h-screen gap-10">
                <div className='flex flex-col justify-center items-center'>
                    <div className={styles.title2}> Problem Statement Sponsors </div>
                    <div className='flex w-full justify-center gap-32 mb-10'>
                        <img src='/sptbiwhitelogo.png' className='h-20'/>
                        <img src='/6D.jpg' className='h-24'/>
                    </div>
                </div>
                <div>
                    <div className={styles.title2}> Fitness Partner </div>
                    <div className='flex w-full justify-center gap-32 mb-10'>
                        <img src='/hap.png' className='h-24'/>
                    </div>
                </div>
                <div>
                    <div className={styles.title2}> Dessert Partner </div>
                    <div className='flex w-full justify-center gap-32 mb-10'>
                        <img src='/bakeandbliss.png' className='h-24'/>
                    </div>
                </div>
                <div>
                    <div className={styles.title2}> Knowledge Partner </div>
                    <div className='flex w-full justify-center gap-32 mb-10'>
                        <img src='/kr.jpg' className='h-24'/>
                    </div>
                </div>
                {/* <div>
                    <div className={styles.title}> Chocolate Partner </div>
                    <div className='flex w-full justify-center gap-32'>
                        <img src='/questtchocolate.png' className='h-24'/>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Sponsors;