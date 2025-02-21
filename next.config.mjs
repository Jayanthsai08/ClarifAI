/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      GEMINI_API_KEY:process.env.GEMINI_API_KEY, // Correct way to expose it
    },
  };
  
  export default nextConfig;
  