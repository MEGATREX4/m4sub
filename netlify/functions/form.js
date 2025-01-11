const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (event.httpMethod === 'POST') {
    try {
      const { minecaftInput, twitchInput } = JSON.parse(event.body);

      console.log('Received input:', { minecaftInput, twitchInput });

      // Get Twitch Access Token
      const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      console.log('Access token received:', accessToken);

      // Get User ID for MEGATREX4
      const channelResponse = await fetch(
        `https://api.twitch.tv/helix/users?login=MEGATREX4`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const channelData = await channelResponse.json();
      const channelId = channelData.data[0]?.id;

      console.log('Channel data:', channelData);

      if (!channelId) {
        console.error('Channel ID not found');
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Cannot retrieve channel ID' }),
        };
      }

      // Get User ID for twitchInput
      const userResponse = await fetch(
        `https://api.twitch.tv/helix/users?login=${twitchInput}`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = await userResponse.json();
      const userId = userData.data[0]?.id;

      console.log('User data:', userData);

      if (!userId) {
        console.error('User ID not found for:', twitchInput);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Twitch user not found' }),
        };
      }

      // Check if the user follows MEGATREX4
      const followResponse = await fetch(
        `https://api.twitch.tv/helix/users/follows?from_id=${userId}&to_id=${channelId}`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const followData = await followResponse.json();

      console.log('Follow data:', followData);

      const isFollowing = followData.total > 0;

      if (!isFollowing) {
        console.warn(`User ${twitchInput} does not follow MEGATREX4`);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'User does not follow your channel' }),
        };
      }

      // Prepare Webhook Body
      const webhookBody = {
        embeds: [
          {
            title: 'Заявки на сервер',
            fields: [
              { name: 'Minecraft', value: minecaftInput },
              { name: 'Twitch', value: twitchInput },
            ],
          },
        ],
      };

      console.log('Sending webhook with body:', webhookBody);

      // Send to Webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookBody),
      });

      if (response.ok) {
        console.log('Webhook sent successfully');
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Заявка надіслана!' }),
        };
      } else {
        console.error('Error sending webhook:', await response.text());
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Помилка при відправці заявки' }),
        };
      }
    } catch (error) {
      console.error('Error processing request:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' }),
      };
    }
  } else {
    console.warn('Invalid HTTP method:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Метод не підтримується' }),
    };
  }
};
