const { normalizeServerUrl, fetchWithFallback } = require("./utils");
const MINECRAFT_SERVER_URL = normalizeServerUrl(process.env.MINECRAFT_SERVER_URL);

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!MINECRAFT_SERVER_URL) {
    console.error("MINECRAFT_SERVER_URL not configured");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  const shopUrl = `${MINECRAFT_SERVER_URL}/api/shop`;
  console.log("Fetching shop from:", shopUrl);

  const response = await fetchWithFallback(
    shopUrl,
    { headers: { 'Accept': 'application/json' } },
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

  // All attempts failed
  console.error("All shop data sources failed");
  return {
    statusCode: 502,
    headers,
    body: JSON.stringify({ 
      error: "Cannot connect to game server. Please try again later.",
      details: "All connection attempts failed"
    }),
  };
};