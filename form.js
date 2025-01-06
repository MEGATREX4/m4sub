async function sendContact(ev) {
  ev.preventDefault();

  const senderMinecaft = document.getElementById('minecaftInput').value;
  const senderTwitch = document.getElementById('twitchInput').value;

  const webhookBody = {
    embeds: [{
      title: 'Заявки на серер',
      fields: [
        { name: 'Minecaft', value: senderMinecaft },
        { name: 'Twitch', value: senderTwitch },
      ]
    }],
  };

  const webhookUrl = process.env.WEBHOOK_URL;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(webhookBody),
  });

  if (response.ok) {
    window.open('https://m4sub.netlify.app/accepted.html/');
  } else {
    alert('Помилка, спробуй пізніше!');
  }
}
