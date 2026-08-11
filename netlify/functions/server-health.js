// netlify/functions/server-health.js
const { normalizeServerUrl, fetchWithTimeout } = require("./utils");
const MINECRAFT_SERVER_URL = normalizeServerUrl(process.env.MINECRAFT_SERVER_URL);

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

  try {
    const response = await fetchWithTimeout(`${MINECRAFT_SERVER_URL}/health`, {}, 8000);

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
    console.error("Health check error:", error);
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ 
        error: "Failed to fetch server health",
        status: "offline"
      }),
    };
  }
};