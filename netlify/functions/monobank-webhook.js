// netlify/functions/monobank-webhook.js
const { normalizeServerUrl, fetchWithTimeout } = require("./utils");
const MINECRAFT_SERVER_URL = normalizeServerUrl(process.env.MINECRAFT_SERVER_URL || "https://api.m4sub.click");
const MINECRAFT_WEBHOOK_SECRET = process.env.MINECRAFT_WEBHOOK_SECRET;

exports.handler = async (event) => {
  // Handle Monobank GET validation
  if (event.httpMethod === "GET") {
    return { statusCode: 200, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const response = await fetchWithTimeout(
      `${MINECRAFT_SERVER_URL}/api/monobank/${MINECRAFT_WEBHOOK_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body,
      },
      10000
    );

    if (!response.ok) {
      console.error("Failed to forward webhook:", response.status);
    }

    return { statusCode: 200, body: "" };
  } catch (error) {
    console.error("Webhook error:", error);
    return { statusCode: 500, body: "Internal error" };
  }
};