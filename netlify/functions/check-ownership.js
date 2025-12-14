// netlify/functions/check-ownership.js
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

  const playerName = event.queryStringParameters?.playerName;
  
  if (!playerName || playerName.length < 3 || playerName.length > 16) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid player name" }),
    };
  }

  try {
    const response = await fetch(
      `${MINECRAFT_SERVER_URL}/api/player/${encodeURIComponent(playerName)}/ownership`,
      {
        headers: {
          "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET,
        },
      }
    );

    if (!response.ok) {
      // Player not found or server error - return empty ownership
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
      throw new Error(`Server responded with ${response.status}`);
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