"use client";
import React from 'react';

const Footer: React.FC = () => {
    const handleLinkPress = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div
            style={{
                backgroundImage: "url('/footer.svg')",
                backgroundPosition: "50% 0",
                backgroundRepeat: "repeat-x",
                backgroundSize: "33px",
                backgroundAttachment: "scroll",
                paddingBottom: 0,
                minHeight: "40vh",
                backgroundColor: "#121212",
                padding: '20px',
                display: 'flex',
                alignItems: 'end',
                width: '100%',
                justifyContent: 'center'
            }}
        >
        
            <div className='w-full'>
                <div className='flex justify-center gap-10'>
                    <img src="/github.svg" alt="github" className='w-[40px]' onClick={()=>handleLinkPress('https://github.com/CSI-SPIT')}/>
                    <img src="/insta.svg" alt="instagram" className='w-[40px]' onClick={()=>handleLinkPress('https://instagram.com/csispit')}/>
                    <img src="/linkdin.svg" alt="linkedin" className='w-[40px]' onClick={()=>handleLinkPress('https://linkedin.com/company/s-p-i-t-csi')}/>
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