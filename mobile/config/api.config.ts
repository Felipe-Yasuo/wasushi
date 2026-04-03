// DEVELOPMENT: Set EXPO_PUBLIC_API_URL in a .env.local file, or replace the
// fallback IP below with your machine's local IP (run `ipconfig` / `ifconfig`).
// PRODUCTION: Set EXPO_PUBLIC_API_URL to your deployed backend URL (e.g. https://api.yourdomain.com).
export const API_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.15.5:3333",
    TIMEOUT: 12000,
};