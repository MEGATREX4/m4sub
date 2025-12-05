// netlify/functions/purchase.js
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
    const response = await fetch(`${MINECRAFT_SERVER_URL}/api/purchase/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET,
      },
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : 400,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Purchase error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to create purchase" }),
    };
  }
};