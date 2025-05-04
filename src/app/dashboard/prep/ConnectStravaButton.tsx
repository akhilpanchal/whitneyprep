import React from 'react';
import Link from 'next/link'
import Image from 'next/image';

export default function ConnectStravaButton() {
    return <div className="p-6 text-center">
        <Link href="/api/strava/auth-url">
            <Image
                src={"/connect-strava.svg"}
                alt="Strava logo"
                width={150}
                height={40}
            />
        </Link>
    </div>
}
