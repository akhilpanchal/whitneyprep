"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Activities({ values }) {
    return (
        <>
            {values.map((act) => {
                console.log("act", act);
                return (
                    <>
                        <Card key={act.id} className="w-[350px] gap-2">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage src="./globe.svg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>{act.name}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{act.description || "No description"}</CardDescription>
                                <ul className="text-sm mt-2 space-y-1">
                                    <li><strong>Distance:</strong> {(act.distance / 1000).toFixed(2)} km</li>
                                    <li><strong>Moving Time:</strong> {(act.moving_time / 60).toFixed(1)} mins</li>
                                    <li><strong>Calories:</strong> {act.kilojoules?.toFixed(0) || "N/A"} kcal</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </>
                )
            })}
        </>
    );
}
