async function loadServerInfo() {
    const serverDomain = 'm4sub.click'; // твій домен
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverDomain}`);
        const data = await response.json();

        if (data.online) {
            const playerCountElement = document.getElementById('player-count');
            const copyButton = document.getElementById('copy-ip');

            playerCountElement.textContent = `Онлайн: ${data.players.online}/${data.players.max}`;
            
            // Зберігаємо IP у кнопку
            copyButton.dataset.ip = serverDomain;

            // Додаємо обробник для копіювання
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(copyButton.dataset.ip)
                    .then(() => {
                        copyButton.textContent = 'Скопійовано!';
                        setTimeout(() => {
                            copyButton.textContent = 'm4sub.click';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Помилка копіювання IP:', err);
                    });
            });

        } else {
            document.getElementById('player-count').textContent = 'Сервер офлайн';
        }
    } catch (error) {
        console.error('Не вдалося завантажити інформацію про сервер:', error);
    }
}

// Викликаємо при завантаженні
loadServerInfo();
