"use client";
import React from 'react';

const Footer: React.FC = () => {

  return (
    <div
      style={{
        backgroundImage: "url('/footer.svg')",
        backgroundPosition: "50% 0",
        backgroundRepeat: "repeat-x",
        backgroundSize: "33px",
        backgroundAttachment: "scroll",
        paddingBottom: 0,
        backgroundColor: "#121212",
        padding: '20px',
        display: 'flex',
        alignItems: 'end',
        width: '100%',
        justifyContent: 'center'
      }}
    >

      <div className='w-full min-h-56 flex flex-col justify-end'>
        <div className='flex justify-center gap-10'>
          <a href="https://github.com/techcsispit" target='_blank' style={{ cursor: "url('/cursor-click.png'), auto" }} >
            <img src="/github.svg" alt="github" className='w-[40px]' />
          </a>
          <a href="https://instagram.com/csispit" target='_blank' style={{ cursor: "url('/cursor-click.png'), auto" }} >
            <img src="/insta.svg" alt="instagram" className='w-[40px]' />
          </a>
          <a href="https://linkedin.com/company/s-p-i-t-csi" target='_blank' style={{ cursor: "url('/cursor-click.png'), auto" }} >
            <img src="/linkdin.svg" alt="linkedin" className='w-[40px]' />
          </a>
        </div>
        <div className="w-full border-t border-gray-800 pt-5 mt-2">
          <p className="text-white text-center text-sm">
            DEVELOPED WITH <span className="text-cyan-400 font-medium">INSOMNIA</span> AND{' '}
            <span className="text-cyan-400 font-medium">CAFFEINE</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;