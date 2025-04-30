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
        <div className="text-6xl font-medium">
            {timeLeft.days}<span className="text-3xl">days</span> {timeLeft.hours}<span className="text-3xl">hours</span> {timeLeft.minutes}<span className="text-3xl">minutes</span> {timeLeft.seconds}<span className="text-3xl">s</span>
        </div>
    );
}