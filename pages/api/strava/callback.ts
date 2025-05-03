import type { NextApiRequest, NextApiResponse } from "next";
import strava from "strava-v3";
import { serialize } from "cookie";
import { tokens } from "../../../src/lib/tokens";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const code = req.query.code as string;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    try {
        const payload = await strava.oauth.getToken(code);
        const { access_token, athlete } = payload;
        tokens[athlete.username] = access_token;

        // Set cookie to remember user
        res.setHeader(
            "Set-Cookie",
            serialize("strava_user", athlete.username, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            })
        );

        // Save token for reuse (use a DB/session in production)
        // process.env.STRAVA_ACCESS_TOKEN = access_token;

        res.redirect("/dashboard");
    } catch (err) {
        console.error("OAuth error:", err);
        res.status(500).json({ error: "OAuth failed" });
    }
}
