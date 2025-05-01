async function loadServerInfo() {
    const serverDomain = 'm4sub.click';
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverDomain}`);
        const data = await response.json();

        if (data.online) {
            const playerCountElement = document.getElementById('player-count');
            const copyButton = document.getElementById('copy-ip');
            const copyText = document.getElementById('copy-ip-text');
            const copyIcon = document.getElementById('copy-icon');

            playerCountElement.textContent = `Онлайн: ${data.players.online}/${data.players.max}`;
            
            copyButton.dataset.ip = serverDomain;

            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(copyButton.dataset.ip)
                    .then(() => {
                        // Зміна тексту і іконки
                        copyText.textContent = 'Скопійовано!';
                        copyIcon.src = '/icons/copied.png';

                        setTimeout(() => {
                            copyText.textContent = 'm4sub.click';
                            copyIcon.src = '/icons/copy.png';
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
