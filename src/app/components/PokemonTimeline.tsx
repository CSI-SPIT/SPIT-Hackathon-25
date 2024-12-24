"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEventProps {
    date: string;
    title: string;
    description: string;
    startTime?: string;
    endTime?: string;
    isLeft: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ date, title, description, startTime, endTime, isLeft }) => {
    return (
        <motion.div
            className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} w-full items-center gap-4 my-8`}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Content */}
            <motion.div
                className={`w-1/2 p-6 rounded-lg shadow-lg ${isLeft ? 'text-right' : 'text-left'}`}
                whileHover={{ scale: 1.02 }}
                style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #FF1111' }}
            >
                <h3 className="text-xl font-bold text-gray-800">{date}</h3>
                <h4 className="text-lg font-semibold text-red-600 mt-2">{title}</h4>
                <p className="text-gray-600 mt-2">{description}</p>
                {startTime && endTime && (
                    <div className="mt-2 text-sm text-gray-500">
                        <p>Start: {startTime}</p>
                        <p>End: {endTime}</p>
                    </div>
                )}
            </motion.div>

            {/* Timeline dot */}
            <motion.div
                className="w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-lg"
                whileHover={{ scale: 1.2, backgroundColor: '#CC0000' }}
            />

            {/* Empty space for alignment */}
            <div className="w-1/2" />
        </motion.div>
    );
};

interface Event {
    date: string;
    title: string;
    description: string;
    startTime?: string;
    endTime?: string;
}

const PokemonTimeline: React.FC = () => {
    const events: Event[] = [
        {
            date: "25 Dec 24",
            title: "Round 1 - Submission Round",
            description: "Teams from initial registration are shortlisted for the final 24-hour hackathon based on this round. Participants are expected to give an abstract solution to the problem statement mentioned.",
            startTime: "25 Dec 24, 12:00 PM IST",
            endTime: "26 Jan 25, 11:59 PM IST"
        },
        {
            date: "8 Feb 25",
            title: "S.P.I.T Hackathon 2025",
            description: "The 24-hour offline hackathon at Sardar Patel Institute of Technology",
            startTime: "08 Feb 25, 08:00 AM IST",
            endTime: "09 Feb 25, 01:00 PM IST"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Title */}
            <motion.h2
                className="text-3xl font-bold text-center mb-12 text-red-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Hackathon Timeline
            </motion.h2>

            {/* Timeline line */}
            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />

                {/* Events */}
                {events.map((event, index) => (
                    <TimelineEvent
                        key={event.date}
                        {...event}
                        isLeft={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default PokemonTimeline;