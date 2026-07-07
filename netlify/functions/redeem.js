const MINECRAFT_SERVER_URL = process.env.MINECRAFT_SERVER_URL;
const MINECRAFT_WEBHOOK_SECRET = process.env.MINECRAFT_WEBHOOK_SECRET;

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

  try {
    const { playerName, code } = JSON.parse(event.body);

    if (!playerName || !code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Player name and code are required" }),
      };
    }

    const response = await fetch(`${MINECRAFT_SERVER_URL}/api/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET,
      },
      body: JSON.stringify({ playerName, code }),
    });

    const data = await response.json();
    return {
      statusCode: response.ok ? 200 : 400,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Redeem error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to redeem code" }),
    };
  }
};
