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
      <div className="max-w-4xl mx-auto p-8 flex flex-col items-center">
        <div className='h-[20vh] w-full'></div>
        <div className="flex flex-col items-center min-h-screen gap-10">
          <div className='flex flex-col justify-center items-center md:m-0'>
            <div className={styles.title2}> Problem Statement Sponsors </div>
            <div className='flex w-full justify-center items-center gap-32 mb-10 flex-col md:flex-row'>
              <a href="https://www.sptbi.com" target='_blank' >
                <img src='/sptbiwhitelogo.png' alt="SPTBI Logo" className='h-[80px]' />
              </a>
              <a href="https://www.linkedin.com/company/volta-industries-llp" target='_blank' >
                <img src='/6D.jpg' alt="Dimension Six Logo" className='h-auto w-[200px]' />
              </a>
            </div>
          </div>
          <div>
            <div className={styles.title2}> Fitness Partner </div>
            <div className='flex w-full justify-center gap-32 mb-10'>
              <a href="https://www.thehapstore.com" target='_blank' >
                <img src='/hap.jpg' alt="The HAP Store Logo" className='w-[300px] object-contain' />
              </a>
            </div>
          </div>
          <div>
            <div className={styles.title2}> Knowledge Partner </div>
            <div className='flex w-full justify-center gap-32 mb-10'>
              <a href="https://knowledge-reach.com" target='_blank' >
                <img src='/kr.jpg' alt="Knowledge Reach Logo" className='h-[200px] object-contain' />
              </a>
            </div>
          </div>
          <div>
            <div className={styles.title2}> Desserts Partner </div>
            <div className='flex w-full justify-center gap-32 mb-10'>
              <a href="https://www.instagram.com/bakenblissbyheni" target='_blank' >
                <img src='/bakeandbliss.png' alt="Bake and Bliss Logo" className='w-[300px] object-contain' />
              </a>
            </div>
          </div>
          <div>
            <div className={styles.title2}> Fragrance Partner </div>
            <div className='flex w-full justify-center gap-32 mb-10'>
              <a href="https://attarfactory.com" target='_blank' >
                <img src='/attar3.png' alt="Attar Factory Logo" className='h-[200px] object-contain' />
              </a>
            </div>
          </div>
          <div>
            <div className={styles.title2}> Chocolates Partner </div>
            <div className='flex w-full justify-center gap-32 mb-10'>
              <a href="https://www.instagram.com/questtchocolates" target='_blank' >
                <img src='/questt.png' alt="Questt Chocolates Logo" className='h-[200px] object-contain' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;