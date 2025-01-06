// netlify/functions/form.js

exports.handler = async function(event, context) {
    // Отримуємо значення змінної середовища
    const webhookUrl = process.env.WEBHOOK_URL;
    
    // Перевірка на отримання даних через POST-запит
    if (event.httpMethod === 'POST') {
      const { minecaftInput, twitchInput } = JSON.parse(event.body);
      
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
  