// netlify/functions/purchase-stats.js
const MINECRAFT_SERVER_URL = process.env.MINECRAFT_SERVER_URL;
const MINECRAFT_WEBHOOK_SECRET = process.env.MINECRAFT_WEBHOOK_SECRET;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // Parse query parameters
  const params = event.queryStringParameters || {};
  const days = parseInt(params.days) || 30;
  const groupBy = params.groupBy || 'day'; // day, week, month

  try {
    const response = await fetch(
      `${MINECRAFT_SERVER_URL}/api/stats/purchases?days=${days}&groupBy=${groupBy}`,
      {
        headers: {
          "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Stats fetch error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch statistics" }),
    };
  }
};