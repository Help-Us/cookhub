/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead
    // domains  deprecated 되었다고 해서 remotePatterns로 바꿨습니다. 이상없으면 주석부분은 삭제해주세요!!
    // domains: [
    //   "static.wtable.co.kr",
    //   "lh3.googleusercontent.com",
    //   "images.pexels.com",
    //   "www.foodsafetykorea.go.kr"
    // ]
    remotePatterns: [
      { protocol: "https", hostname: "static.wtable.co.kr" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.foodsafetykorea.go.kr" }
    ]
  }
};

export default nextConfig;
