// netlify/functions/check-ownership.js
const { normalizeServerUrl, fetchWithFallback } = require("./utils");
const MINECRAFT_SERVER_URL = normalizeServerUrl(process.env.MINECRAFT_SERVER_URL);
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

  const playerName = event.queryStringParameters?.playerName;
  
  if (!playerName || playerName.length < 3 || playerName.length > 16) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid player name" }),
    };
  }

  if (!MINECRAFT_SERVER_URL || !MINECRAFT_WEBHOOK_SECRET) {
    console.error("Ownership function misconfigured: MINECRAFT_SERVER_URL or MINECRAFT_WEBHOOK_SECRET is missing");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Ownership function misconfigured" }),
    };
  }

  try {
    const url = `${MINECRAFT_SERVER_URL}/api/player/${encodeURIComponent(playerName)}/ownership`;
    const response = await fetchWithFallback(url, {
      headers: {
        "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET,
      },
    });

    if (!response) {
      throw new Error("Unable to reach ownership backend");
    }

    if (response.status === 404) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          playerName,
          exists: false,
          ownedItems: [],
        }),
      };
    }

    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      console.error("Ownership backend error:", response.status, bodyText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: `Ownership backend error: ${response.status}` }),
      };
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Ownership check error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to check ownership" }),
    };
  }
};