// pages/api/strava/auth-url.ts

export default function handler(req, res) {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const redirectUri = "http://localhost:3000/api/strava/callback";
  
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=read,activity:read`;
  
    res.redirect(authUrl);
  }
  