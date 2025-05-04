"use client";
import React, { useEffect, useState } from "react";
import ConnectStravaButton from "./ConnectStravaButton";
import Activities from "./Activities";

interface Activity {
    id: number;
    name: string;
    description: string;
    distance: number;
    moving_time: number;
    kilojoules?: number;
}

export default function StravaActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/strava/activities");
                const data = await res.json();

                if (!res.ok) {
                    if (res.status === 401) {
                        setUnauthorized(true);
                    }
                    throw new Error(data.error || "Failed to fetch activities");
                }
                setActivities(data.activities);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p className="p-6 text-gray-500">Loading activities...</p>;

    if (unauthorized) {
        return (
            <ConnectStravaButton />
        );
    }

    if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

    return (
            <Activities values={activities} />
    );
}
