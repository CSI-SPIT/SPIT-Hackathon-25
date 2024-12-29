"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";

const StickyButton: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [initialOffset, setInitialOffset] = useState(0);

    useEffect(() => {
        // Store the initial button offset from the top of the page
        const buttonElement = document.getElementById("sticky-button");
        if (buttonElement) {
            setInitialOffset(buttonElement.getBoundingClientRect().top + window.scrollY);
        }

        const handleScroll = () => {
            if (window.scrollY >= initialOffset) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [initialOffset]);

    return (
        <div
            id="sticky-button"
            className={`transition-transform duration-500 ease-in-out ${
                isSticky
                    ? "fixed right-5 top-5 z-20 transform translate-x-0" // Slides to the fixed position
                    : "absolute inset-x-0 bottom-[100px] z-10 transform translate-x-[-50%]" // Original position
            } flex justify-center items-center`}
        >
            <Button
                href="https://unstop.com/p/spit-hackathon-2025-sardar-patel-institute-of-technology-spit-mumbai-1306391?lb=w53aomp"
                text="Register"
            />
        </div>
    );
};

export default StickyButton;
