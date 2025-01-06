
async function sendContact(ev) {
    ev.preventDefault();

    const senderMinecaft = document
      .getElementById('minecaftInput').value;
    const senderTwitch = document
      .getElementById('twitchInput').value;

    const webhookBody = {
      embeds: [{
        title: 'Заявки на серер',
        fields: [
          { name: 'Minecaft', value: senderMinecaft },
          { name: 'Twitch', value: senderTwitch },
        ]
      }],
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1030955493948133407/r2kFDqfkrFezOmw__pHpq9NC9huJYv0XcMV9_GoA5V9mHExlEfE9Sk3cCbvUwAt_PyyU';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });

    if (response.ok) {
        window.open('https://megatrex4sub.online/accepted.html/');
      } else {
        alert('Помилка, спробуй пізніше!');
      }

  }