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

  if (!MINECRAFT_SERVER_URL) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  const params = event.queryStringParameters || {};
  const days = parseInt(params.days) || 30;
  const groupBy = params.groupBy || 'day';

  const statsUrl = `${MINECRAFT_SERVER_URL}/api/stats/purchases?days=${days}&groupBy=${groupBy}`;
  const response = await fetchWithFallback(
    statsUrl,
    {
      headers: {
        "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET || "",
        'Accept': 'application/json',
      },
    },
    8000
  );

  if (response && response.ok) {
    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  }

  // All failed - return empty stats instead of error
  console.error("All stats sources failed, returning empty data");
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      stats: [],
      totalAmount: 0,
      totalPurchases: 0
    }),
  };
};