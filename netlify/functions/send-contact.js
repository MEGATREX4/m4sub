// netlify/functions/send-contact.js
exports.handler = async (event, context) => {
    const webhookUrl = process.env.WEBHOOK_URL;
    
    const body = JSON.parse(event.body);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success" }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error" }),
      };
    }
  };
  