import { useState } from 'react';
import styles from './Tablet.module.css';

interface Icon {
    src: string;
    alt: string;
}

const icons: Icon[] = [
    { src: '/bitcoin.svg', alt: 'Blockchain' },
    { src: '/rocket.svg', alt: 'AI/ML' },
    { src: '/mobile.svg', alt: 'Mobile-Dev' },
    { src: '/web.svg', alt: 'Web-Dev' },
];

export default function Tablet() {
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        setSelectedIcon(index);
    };

    return (
        <div className={styles.pixelBorder}>
            <div className="block p-5 md:flex gap-10">
                <div>
                    <h2 className={styles.testFont}>SPIT Hackathon 2025</h2>
                    <div className="max-w-96">
                        <p className={styles.para}>
                            Following tradition, CSI-SPIT is conducting the annual 24-hour SPIT Hackathon in February 2025. With a great team and skilled panel of judges, this hackathon will be an ideal platform to put students&apos; knowledge to use and network with peers.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {icons.map((icon, index) => (
                        <div key={index} className="flex justify-center">
                            {/* icons mapped */}
                            <input
                                type="radio"
                                name="icon"
                                id={`icon-${index}`}
                                checked={selectedIcon === index}
                                onChange={() => handleSelect(index)}
                                className="hidden"
                            />
                            {/* code to make icon blink when selected */}
                            <label htmlFor={`icon-${index}`} className={`cursor-pointer ${selectedIcon === index ? styles.blink : ''}`}>
                                <div className="flex flex-col w-fill h-fill items-center justify-center">
                                    <img
                                        src={icon.src}
                                        alt={icon.alt}
                                        className="h-[68px]"
                                    />
                                    <p className={styles.para}>{icon.alt}</p>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}