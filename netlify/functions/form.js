const fetch = require('node-fetch'); // Використовуємо require для 2.x версії

exports.handler = async function(event, context) {
    const webhookUrl = process.env.WEBHOOK_URL;
    const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN; // твій Twitch access token
    const twitchClientId = process.env.TWITCH_CLIENT_ID; // твій Twitch Client ID
    const myTwitchChannelId = '12345678'; // Замінити на твій канал MEGATREX4

    // Дебаг повідомлення про час і пам'ять
    console.log(`Request received at ${new Date().toISOString()}`);
    console.log(`Memory Usage: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);

    // Перевірка на отримання даних через POST-запит
    if (event.httpMethod === 'POST') {
        const { minecaftInput, twitchInput } = JSON.parse(event.body);

        // Дебаг повідомлення про отримані дані
        console.log(`Received minecraftInput: ${minecaftInput}, twitchInput: ${twitchInput}`);

        // Перевірка чи є twitchInput (наприклад, Twitch username)
        const twitchUsername = twitchInput;

        // Отримуємо Twitch ID для каналу
        const channelId = await getTwitchChannelId(twitchUsername, twitchClientId, twitchAccessToken);
        if (!channelId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Невірний Twitch username!' }),
            };
        }

        console.log(`Twitch ID для ${twitchUsername}: ${channelId}`);

        // Перевірка чи користувач фоловить твій канал MEGATREX4 через список стрімів, на які він підписаний
        const isFollower = await checkTwitchFollower(channelId, twitchAccessToken);
        if (!isFollower) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Ви не зафоловили канал MEGATREX4, спочатку підпишіться на нього!' }),
            };
        }

        // Дебаг повідомлення, якщо користувач фоловить канал
        console.log(`${twitchUsername} є фоловером каналу MEGATREX4`);

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

// Функція для отримання ID користувача на Twitch
async function getTwitchChannelId(username, clientId, accessToken) {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
        method: 'GET',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();
    if (data.data && data.data.length > 0) {
        return data.data[0].id; // Отримуємо ID користувача
    } else {
        return null;
    }
}

// Функція для перевірки фоловера на Twitch за допомогою отриманого токену доступу
async function checkTwitchFollower(twitchId, twitchInput) {
    try {
      const followedStreamsResponse = await fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${twitchId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${twitchAccessToken}`, // OAuth токен
          'Client-Id': 'your-client-id', // Ваш client ID
        },
      });
      
      const followedStreamsData = await followedStreamsResponse.json();
  
      // Перевіряємо, чи є дані і чи це масив
      if (followedStreamsData.data && Array.isArray(followedStreamsData.data)) {
        const isFollowing = followedStreamsData.data.some(stream => stream.user_login === twitchInput);
        
        if (isFollowing) {
          console.log(`Користувач ${twitchInput} підписаний на ваш канал.`);
        } else {
          console.log(`Користувач ${twitchInput} не підписаний на ваш канал.`);
        }
      } else {
        console.error('Не вдалося отримати дані про підписки.');
      }
    } catch (error) {
      console.error('Сталася помилка під час перевірки підписки на Twitch:', error);
    }
  }
  
