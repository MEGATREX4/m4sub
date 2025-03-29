// ./netlify/functions/form.js backend
const fetch = require('node-fetch');

exports.handler = async function (event) {
  // Отримання змінних середовища
  const webhookUrl = process.env.WEBHOOK_URL;
  const apiUrl = process.env.API_URL; // URL Pterodactyl API
  const apiKey = process.env.PTERODACTYL_API_KEY; // API ключ

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Метод не підтримується' }) };
  }

  const { minecaftInput, twitchInput } = JSON.parse(event.body);

  const webhookBody = {
    embeds: [{
      title: 'Заявка на сервер',
      fields: [
        { name: 'Minecraft', value: minecaftInput },
        { name: 'Twitch', value: twitchInput },
      ],
    }],
  };

  try {
    // Відправка заявки в Discord Webhook
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookBody),
    });

    // Відправка команди "/say api test" на сервер
    const commandResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ command: "/say api test" }),
    });

    const result = await commandResponse.json();

    if (!commandResponse.ok) {
      throw new Error(`Помилка виконання команди: ${JSON.stringify(result)}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Команда виконана успішно!', response: result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Помилка: ${error.message}` }),
    };
  }
};
