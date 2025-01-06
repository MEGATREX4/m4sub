const fetch = require('node-fetch'); // Використовуємо require для 2.x версії

exports.handler = async function(event, context) {
    const webhookUrl = process.env.WEBHOOK_URL;

    // Дебаг повідомлення про час і пам'ять
    console.log(`Request received at ${new Date().toISOString()}`);
    console.log(`Memory Usage: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);

    // Перевірка на отримання даних через POST-запит
    if (event.httpMethod === 'POST') {
        const { minecraftInput, twitchInput } = JSON.parse(event.body);

        // Дебаг повідомлення про отримані дані
        console.log(`Received minecraftInput: ${minecraftInput}, twitchInput: ${twitchInput}`);

        const webhookBody = {
            embeds: [{
                title: 'Заявки на сервер',
                fields: [
                    { name: 'Minecraft', value: minecraftInput },
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
