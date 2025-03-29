const axios = require('axios');

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
    await axios.post(webhookUrl, webhookBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Відправка команди "/say api test" на сервер через Pterodactyl API
    const commandResponse = await axios.post(
      apiUrl,
      { command: "/say api test" },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Команда виконана успішно!', response: commandResponse.data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Помилка: ${error.response?.data || error.message}` }),
    };
  }
};
