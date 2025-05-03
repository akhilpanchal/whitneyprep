import React from 'react';

export default function ConnectStravaButton() {
    return <div className="p-6 text-center">
        <a href="/api/strava/auth-url">
            <img
                src={"/connect-strava.svg"}
                alt="Strava logo"
            />
        </a>
    </div>
}
