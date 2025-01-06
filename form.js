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
