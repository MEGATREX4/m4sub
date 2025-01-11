// netlify/functions/form.js
const fetch = require('node-fetch');  // Ensure to include fetch

exports.handler = async function(event, context) {
  // Getting webhook URL and Twitch credentials
  const webhookUrl = process.env.WEBHOOK_URL;
  const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN;
  const clientId = 'gp762nuuoqcoxypju8c569th9wz7q5';  // Your client ID
  const channelName = 'MEGATREX4';  // Your Twitch channel name

  // Check if the request method is POST
  if (event.httpMethod === 'POST') {
    const { minecaftInput, twitchInput } = JSON.parse(event.body);
    
    // Call Twitch API to check if the user follows the channel
    const twitchFollowCheckUrl = `https://api.twitch.tv/helix/users/follows?from_id=${twitchInput}&to_id=${channelName}`;
    
    try {
      const followResponse = await fetch(twitchFollowCheckUrl, {
        method: 'GET',
        headers: {
          'Client-Id': clientId,
          'Authorization': `Bearer ${twitchAccessToken}`,
        },
      });

      const followData = await followResponse.json();

      // Check if the response indicates the user is following the channel
      if (followData.data && followData.data.length > 0) {
        // User follows the channel, proceed with webhook
        const webhookBody = {
          embeds: [{
            title: 'Заявки на сервер',
            fields: [
              { name: 'Minecraft', value: minecaftInput },
              { name: 'Twitch', value: twitchInput },
            ],
          }],
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookBody),
        });

        if (response.ok) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Заявка надіслана!' }),
          };
        } else {
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Помилка при відправці заявки' }),
          };
        }
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'You need to follow the Twitch channel first!' }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Twitch API error' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Метод не підтримується' }),
    };
  }
};
