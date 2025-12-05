// netlify/functions/monobank-webhook.js
const MINECRAFT_SERVER_URL = process.env.MINECRAFT_SERVER_URL;
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
    const response = await fetch(
      `${MINECRAFT_SERVER_URL}/api/monobank/${MINECRAFT_WEBHOOK_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body,
      }
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