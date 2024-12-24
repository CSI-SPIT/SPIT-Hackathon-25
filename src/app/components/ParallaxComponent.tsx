"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";
import Card from "./Card";
import Image from 'next/image';


export default function ParallaxComponent() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -300]);

    // const heroRef = useRef(null);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) {
    //                 // Add animation classes when in view
    //                 const spitElement = document.getElementsByClassName("spit")[0];
    //                 const hackathonElement = document.getElementsByClassName("hackathon")[0];

    //                 if (spitElement) spitElement.classList.add("animate");
    //                 if (hackathonElement) hackathonElement.classList.add("animate");;
    //             }
    //         },
    //         {
    //             threshold: 0.5, // Trigger when at least 50% of the element is in view
    //         }
    //     );

    //     if (heroRef.current) {
    //         observer.observe(heroRef.current);
    //     }

    //     return () => {
    //         if (heroRef.current) {
    //             observer.unobserve(heroRef.current);
    //         }
    //     };
    // }, []);

    //TEXT ANIMATION UNDER WORK



    const cards = [
        { src: "./card1.svg", alt: "card1", inputRange: [0, 300] as [number, number], outputRange: [0, -800] as [number, number], left: "50%" },
        { src: "./card2.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -1000] as [number, number], left: "25%" },
        { src: "./card3.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -700] as [number, number], left: "75%" },
        { src: "./card4.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -1000] as [number, number], left: "80%" },
        { src: "./card5.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -600] as [number, number], left: "15%" },
        { src: "./card6.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -800] as [number, number], left: "45%" },
        { src: "./card7.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -700] as [number, number], left: "60%" },
        { src: "./card8.svg", alt: "card2", inputRange: [0, 300] as [number, number], outputRange: [0, -800] as [number, number], left: "30%" },
    ];

    return (
        <div className="bg-black relative" style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Image
                src="/logo.svg"
                alt="logo"
                width={48} // Set appropriate width
                height={65} // Set appropriate height
                style={{ position: "absolute", zIndex: 2, top: 25, left: 25 }}
            />
            <motion.div
                className="hero"
                style={{
                    backgroundImage: "url('/back.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    y: y1,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            >
                {cards.map((card, index) => (
                    <div key={index} className="hidden lg:block">
                        <Card
                            key={index}
                            src={card.src}
                            alt={card.alt}
                            scrollY={scrollY}
                            inputRange={card.inputRange}
                            outputRange={card.outputRange}
                            left={card.left}
                        />
                    </div>
                ))}
                <div className="title flex flex-row pb-20 items-center justify-center gap-4 lg:gap-8">
                    <img
                        src="/title1.png"
                        alt="title1"
                        className="w-[23%] h-auto object-contain spit"
                        style={{ position: "relative", zIndex: 10 }}
                    />
                    <img
                        src="/title2.png"
                        alt="title2"
                        className="w-[40%] h-auto object-contain hackathon"
                        style={{ position: "relative", zIndex: 10 }}
                    />
                </div>
                {/* <img
                    src="/title.svg"
                    alt="title"
                    style={{
                        width: "50%",
                        height: "60%",
                        objectFit: "contain",
                        position: "absolute",
                        zIndex: 10,
                        top: 80,
                    }}
                /> */}
            </motion.div>
            <div className="absolute inset-x-0 bottom-[100px] flex justify-center z-10 items-center">
                <Button href="#" text="Click to Register" />
            </div>
            <motion.div
                style={{
                    y: y2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: 0,
                    width: "100%",
                    height: "100%",
                    minHeight: "100vh",
                }}
            >
                <img
                    src="/parallax.svg"
                    alt="Parallax"
                    style={{
                        width: "100%",
                        height: "70%",
                        objectFit: "cover",
                        position: "absolute",
                        zIndex: 20,
                        bottom: -480,
                        left: 0,
                    }}
                />
            </motion.div>
        </div>
    );
}