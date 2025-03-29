const axios = require('axios');

exports.handler = async function (event) {
  // Отримання змінних середовища
  const webhookUrl = process.env.WEBHOOK_URL;
  const webhookUrlPlayers = process.env.WEBHOOK_URL_PLAYERS;
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.PTERODACTYL_API_KEY;

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Метод не підтримується' }) };
  }

  const { minecaftInput, twitchInput } = JSON.parse(event.body);

  // URL аватара гравця Minecraft
  const avatarUrl = `https://www.mc-heads.net/avatar/${minecaftInput}`;

  // Перше повідомлення (основна заявка)
  const webhookBody = {
    embeds: [{
      title: 'Заявка на сервер',
      color: 0x00ff00, // Зелений колір
      fields: [
        { name: '🎮 Minecraft', value: minecaftInput, inline: true },
        { name: '📺 Twitch', value: twitchInput, inline: true },
      ],
      footer: { text: "🔗 Нова заявка на сервер" },
      timestamp: new Date().toISOString(),
    }],
  };

  // Друге повідомлення (з аватаром гравця)
  const avatarMessage = {
    username: minecaftInput,
    avatar_url: avatarUrl,
    thumbnail: { url: avatarUrl },
    embeds: [{
      title: 'Заявка на сервер',
      description: `Ми раді вітати ${minecaftInput} на нашому сервері!`,
      color: 0x3498db,
      thumbnail: { url: avatarUrl },
      fields: [
        { name: '🎮 Minecraft Нік:', value: `**${minecaftInput}**`, inline: true },
        { name: '📺 Twitch Нік:', value: `**${twitchInput}**`, inline: true },
      ],
      footer: { text: 'Приєднуйтесь до нашої спільноти та грайте разом!' },
      timestamp: new Date().toISOString(),
    }],
  };

  try {
    // Відправка основного повідомлення в Discord Webhook
    await axios.post(webhookUrl, webhookBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Відправка другого повідомлення з аватаром
    await axios.post(webhookUrlPlayers, avatarMessage, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Відправка команди "/say api test" на сервер через Pterodactyl API
    const commandResponse = await axios.post(
      apiUrl,
      { command: "nwl add name " + minecaftInput },
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
