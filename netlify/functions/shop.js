// netlify/functions/shop.js
const MINECRAFT_SERVER_URL = process.env.MINECRAFT_SERVER_URL;

// Backup public HTTPS proxies for redundancy
const BACKUP_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://cors-anywhere.herokuapp.com/${url}`,
];

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

  try {
    const shopUrl = `${MINECRAFT_SERVER_URL}/api/shop`;
    
    // Try primary server first
    let response = await fetch(shopUrl).catch(() => null);
    
    // If primary fails, try backup proxies
    if (!response) {
      for (const proxyBuilder of BACKUP_PROXIES) {
        try {
          response = await fetch(proxyBuilder(shopUrl));
          if (response.ok) break;
        } catch (e) {
          console.warn("Backup proxy failed:", e);
        }
      }
    }
    
    if (!response) {
      throw new Error("All shop data sources failed");
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Shop fetch error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch shop data" }),
    };
  }
};