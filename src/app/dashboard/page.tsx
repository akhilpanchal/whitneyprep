import React from "react";
import Dashboard from "./Dashboard";


export default async function DashboardPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="flex flex-col space-y-4 mb-6">
                <Dashboard />
            </div>
        </main>
    );
}
