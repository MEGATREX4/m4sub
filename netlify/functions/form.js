// netlify/functions/form.js

const fetch = require('node-fetch'); // якщо fetch ще не підключений

exports.handler = async function(event, context) {
    const webhookUrl = process.env.WEBHOOK_URL;
    const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN; // Отримуємо токен доступу Twitch із середовища

    // Перевірка на отримання даних через POST-запит
    if (event.httpMethod === 'POST') {
      const { minecaftInput, twitchInput } = JSON.parse(event.body);

      // Запит до Twitch API для перевірки, чи зафоловив користувач акаунт
      const isFollowing = await checkIfUserFollows(twitchInput, twitchAccessToken);

      if (!isFollowing) {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: 'Ви повинні бути підписані на канал для відправки заявки!' }),
        };
      }

      const webhookBody = {
        embeds: [{
          title: 'Заявки на сервер',
          fields: [
            { name: 'Minecraft', value: minecaftInput },
            { name: 'Twitch', value: twitchInput },
          ],
        }],
      };

      // Відправка даних на webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookBody),
      });

      // Перевірка відповіді
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
      // Якщо не POST-запит
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Метод не підтримується' }),
      };
    }
};

// Функція для перевірки, чи зафоловив користувач
async function checkIfUserFollows(twitchUsername, accessToken) {
  const clientId = process.env.TWITCH_CLIENT_ID; // твій client_id Twitch
  const url = `https://api.twitch.tv/helix/users/follows?from_id=${twitchUsername}&to_id=${clientId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': clientId,
      },
    });

    const data = await response.json();

    // Перевіряємо, чи є запис у відповіді
    if (data.data && data.data.length > 0) {
      return true; // Користувач зафоловив
    } else {
      return false; // Користувач не зафоловив
    }
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false; // Якщо сталася помилка, можна припустити, що користувач не зафоловив
  }
}
