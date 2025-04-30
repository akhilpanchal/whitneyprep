"use client";
import React, { useState, useEffect } from "react";
export default function CountdownTimer() {
    const targetDate = new Date("July 20, 2025 06:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-center">🏔️ Mount Whitney Countdown</h1>
            <div className="flex flex-col sm:flex-row space-x-4 font-mono">
                <span className="text-6xl font-medium space-x-2">
                    <span>{timeLeft.days}</span>
                    <span className="text-3xl">days</span>
                </span>
                <span className="text-6xl font-medium space-x-2">
                    <span>{timeLeft.hours}</span>
                    <span className="text-3xl">hours</span>
                </span>
                <span className="text-6xl font-medium space-x-2">
                    <span>{timeLeft.minutes}</span>
                    <span className="text-3xl">minutes</span>
                </span>
                <span className="text-6xl font-medium space-x-2">
                    <span>{timeLeft.seconds}</span>
                    <span className="text-3xl">s</span>
                </span>
            </div>
        </>

    );
}