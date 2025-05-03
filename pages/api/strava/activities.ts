import type { NextApiRequest, NextApiResponse } from "next";
import strava from "strava-v3";
import { parse } from "cookie";
import { tokens } from "../../../src/lib/tokens";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || "");
    const username = cookies.strava_user;

    if (!username || !tokens[username]) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const accessToken = tokens[username];

    try {
        strava.athlete.listActivities({ access_token: accessToken }, (err, payload) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ activities: payload });
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
