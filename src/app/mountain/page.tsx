import React from "react";
import MountainPage from "./MountainPage";


export default async function Mountain() {
    return (
        <main className="p-6 flex flex-col min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Know Your Mountain</h1>
            <div className="flex flex-col space-y-4 mb-6">
                <MountainPage />
            </div>
        </main>
    );
}
