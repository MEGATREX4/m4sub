import fetch from 'node-fetch'; // Замінили require на import

export const handler = async function(event, context) {
    const webhookUrl = process.env.WEBHOOK_URL;
    const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN; // твій Twitch access token
    
    // Перевірка на отримання даних через POST-запит
    if (event.httpMethod === 'POST') {
        const { minecaftInput, twitchInput } = JSON.parse(event.body);
        
        // Перевірка, чи є twitchInput (наприклад, Twitch username)
        const twitchUsername = twitchInput;

        // Перевірка чи користувач фоловить твій канал
        const isFollower = await checkTwitchFollower(twitchUsername, twitchAccessToken);

        if (!isFollower) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Ви не зафоловили канал, спочатку підпишіться на нього!' }),
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

// Функція для перевірки фоловера на Twitch
async function checkTwitchFollower(username, accessToken) {
    const twitchClientId = process.env.TWITCH_CLIENT_ID; // твій Twitch Client ID
    const channelId = 'MEGATREX4'; // твій Twitch Channel ID

    const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${username}&to_id=${channelId}`, {
        method: 'GET',
        headers: {
            'Client-ID': twitchClientId,
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    // Перевіряємо, чи є запис про фоловера
    return data.data && data.data.length > 0;
}
