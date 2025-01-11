async function authorizeTwitch() {
  // Redirect to Twitch authorization URL
  const clientId = "YOUR_TWITCH_CLIENT_ID";
  const redirectUri = encodeURIComponent("https://megatrex4sub.online/oauth.html");
  const scopes = "user:read:subscriptions";
  const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;

  window.location.href = authUrl;
}

async function sendContact(ev) {
  ev.preventDefault();

  const senderMinecraft = document.getElementById('minecaftInput').value;
  const senderTwitch = document.getElementById('twitchInput').value;

  const webhookBody = {
    minecaftInput: senderMinecraft,
    twitchInput: senderTwitch,
  };

  try {
    // Відправка даних на функцію Netlify
    const response = await fetch('/.netlify/functions/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });

    const result = await response.json();

    if (response.ok) {
      window.open('https://m4sub.netlify.app/accepted.html/');
    } else {
      alert(result.message || 'Помилка, спробуй пізніше!');
    }
  } catch (error) {
    alert('Помилка при відправці заявки, спробуйте пізніше.');
  }
}