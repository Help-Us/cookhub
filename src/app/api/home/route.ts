// src/app/api/home/route.ts
export async function GET(request: Request) {
    try{
        // const apiKey = process.env.REACT_APP_API_KEY;
        // ${apiKey}
        const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/100/RCP_NM=%22%ED%8C%8C%EC%8A%A4%ED%83%80%22`);
        const home = await response.json();

        return Response.json({
            home,
        });
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}
  