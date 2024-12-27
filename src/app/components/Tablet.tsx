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
    return (
        <div className='relative'>
            <div className={styles.pixelBorder}>
                <div className="block p-5 md:flex gap-10">
                    <div>
                        <h2 className={styles.testFont}>SPIT Hackathon 2025</h2>
                        <div className={`${styles.para} max-w-96`}>
                            <p className="mb-10">
                                Following tradition, CSI-SPIT is conducting the annual 24-hour SPIT Hackathon in February 2025. With a great team and skilled panel of judges, this hackathon will be an ideal platform to put students&apos; knowledge to use and network with peers.
                            </p>
                            <p>Team Size: </p>
                            <p>Venue: </p>
                            <p>Date: </p>
                            <p>Time: </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pb-20">
                        {icons.map((icon, index) => (
                            <div key={index} className={`${styles.blink} flex justify-center`}>
                                    <div className="flex flex-col w-fill h-fill items-center justify-center">
                                        <img
                                            src={icon.src}
                                            alt={icon.alt}
                                            className="h-[68px]"
                                        />
                                        <p className={styles.para}>{icon.alt}</p>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}