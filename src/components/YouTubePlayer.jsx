import React from 'react';

// Допоміжна функція для отримання ID відео з різних форматів URL YouTube
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    console.error("Could not extract YouTube video ID from URL:", url);
    return null;
  }
};

export default function YouTubePlayer({ url, title = 'YouTube video player' }) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="my-6 p-4 bg-red-900/20 text-red-300 cornerCutSmall">
        <p>Помилка: Не вдалося завантажити відео. Перевірте посилання: {url}</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="relative pb-[56.25%] h-0 my-6 cornerCut shadow-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}