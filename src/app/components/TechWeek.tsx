import styles from './TechWeek.module.css';

interface SectionProps {
  title: string;
  text: string;
  date: string;
}

export default function TechWeek() {
  const sections = [
    { title: 'API Workshop, SQL Workshop', text: 'API Workshop: Dive into the fundamentals of APIs, including how they enable communication between different software systems. SQL Workshop: Explore the core concepts of SQL for database management.' , date: '/feb3.svg' },
    { title: 'Education Fair', text: 'Education Fair: Explore opportunities and insights at the education fair, a one-stop platform for academic and career guidance.' , date: '/feb4.svg' },
    { title: 'UNSQLVED', text: 'Put your SQL expertise to the test in an engaging competition filled with challenging tasks and exciting rewards.' , date: '/feb5.svg' },
    { title: 'rAPId', text: 'Dive into real-world API scenarios and showcase your problem-solving skills in this engaging and collaborative event. Tech Fest Setup: Immerse yourself in a tech-themed festival featuring vibrant booths, gaming zones, food stalls, and interactive activities.' , date: '/feb6.svg' },
    { title: 'Main Speaker Session', text: 'Main Speaker Session: Attend an inspiring session with an expert speaker sharing insights and knowledge on cutting-edge topics. Tech Fair: Experience the excitement of the tech fair with interactive stalls, gaming challenges, wearable tech, and much more.' , date: '/feb7.svg' },
  ];

  return (
    <div className='flex w-[17rem] mt-96 flex-col items-center mb-16 gap-5 xxs:w-[20rem] xs:w-[23rem] md:mt-1 md:w-[90vw] lg:w-[60vw]'>
      <div className={styles.title}> Tech Week </div>
      {sections.map((section, index) => (
        <Section key={index} title={section.title} text={section.text} date={section.date} />
      ))}
    </div>
  );
}

function Section({ title, text, date }: SectionProps) {
  return (
    <div className={`block relative md:flex`}>
      <div className={`${styles.pixelBorder2}`}>
        <div className="block px-4 md:flex justify-between">
            <h2 className={`${styles.testFont}`}>{title}</h2>
            <img src={date} alt="" />
        </div>
        <p className={`${styles.para} px-4 pt-4`}>{text}</p>
      </div>
    </div>
  );
}