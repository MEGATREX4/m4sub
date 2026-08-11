const { normalizeServerUrl, fetchWithTimeout } = require("./utils");
const MINECRAFT_SERVER_URL = normalizeServerUrl(process.env.MINECRAFT_SERVER_URL || "https://api.m4sub.click");
const MINECRAFT_WEBHOOK_SECRET = String(
  process.env.MINECRAFT_WEBHOOK_SECRET ||
  process.env.NETLIFY_SECRET ||
  process.env.REACT_APP_NETLIFY_SECRET ||
  ""
).trim();

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!MINECRAFT_SERVER_URL || !MINECRAFT_WEBHOOK_SECRET) {
    console.error("Purchase function misconfigured: MINECRAFT_SERVER_URL or MINECRAFT_WEBHOOK_SECRET is missing");
    console.error("Purchase secret length:", MINECRAFT_WEBHOOK_SECRET.length);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  console.log("Purchase function using webhook secret length:", MINECRAFT_WEBHOOK_SECRET.length);

  try {
    const purchaseUrl = `${MINECRAFT_SERVER_URL}/api/purchase/create`;
    console.log("Creating purchase at:", purchaseUrl);

    const response = await fetchWithTimeout(
      purchaseUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET,
        },
        body: event.body,
      },
      15000
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Purchase backend error:", response.status, data);
    }

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Purchase error:", error);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: "Cannot connect to game server",
        message: "Server is temporarily unavailable. Please try again later."
      }),
    };
  }
};