const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const twitchClientId = process.env.TWITCH_CLIENT_ID;
  const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (event.httpMethod === "POST") {
    const { minecaftInput, twitchInput } = JSON.parse(event.body);

    try {
      // Validate Twitch subscription status
      const validationResponse = await fetch(
        `https://id.twitch.tv/oauth2/validate`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${twitchInput}`,
          },
        }
      );

      if (!validationResponse.ok) {
        throw new Error("Invalid Twitch token or no subscription.");
      }

      const validationData = await validationResponse.json();
      const userId = validationData.user_id;

      // Fetch subscriptions
      const subscriptionResponse = await fetch(
        `https://api.twitch.tv/helix/subscriptions?broadcaster_id=YOUR_BROADCASTER_ID&user_id=${userId}`,
        {
          headers: {
            "Client-ID": twitchClientId,
            Authorization: `Bearer ${twitchClientSecret}`,
          },
        }
      );

      if (!subscriptionResponse.ok) {
        throw new Error("User is not subscribed.");
      }

      const subscriptionData = await subscriptionResponse.json();
      if (subscriptionData.total === 0) {
        throw new Error("No active subscription found.");
      }

      // Send to webhook
      const webhookBody = {
        embeds: [
          {
            title: "Заявки на сервер",
            fields: [
              { name: "Minecraft", value: minecaftInput },
              { name: "Twitch", value: userId },
            ],
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookBody),
      });

      if (response.ok) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Заявка надіслана!" }),
        };
      } else {
        throw new Error("Failed to send webhook.");
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Метод не підтримується" }),
    };
  }
};
