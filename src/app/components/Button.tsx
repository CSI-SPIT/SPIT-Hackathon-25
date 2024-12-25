"use client";
import React from 'react';
import styles from './Button.module.css'
interface ButtonProps {
    href: string;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ href, text }) => {
    return (
        <a href={href} className={styles.button}>{text}</a>
    );
};

export default Button;