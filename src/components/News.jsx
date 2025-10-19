import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';
import ArticleMeta from './ArticleMeta';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const newsArticles = await getAllNews();
        setArticles(newsArticles.slice(0, 3)); // тільки останні 3
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img src="/news.png" alt="Новини" className="shadow w-64 h-64 md:w-80 md:h-80" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-200">Останні новини</h2>
          <p className="mt-4">Завантаження...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      {/* Шапка блоку */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div className="flex justify-center">
          <img src="/news.png" alt="Новини" className="shadow w-64 h-64 md:w-80 md:h-80" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-200">Останні новини</h2>
          <p className="mt-4">Слідкуйте за останніми подіями на нашому сервері</p>
          <div className="flex gap-4 mt-6">
            <Link 
              to="/news" 
              className="text-center inline-block px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-gray-200 font-bold cornerCutSmall transition"
            >
              Усі новини
            </Link>
            <a 
              href="https://discord.gg/fxqnU9by3M"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center inline-block px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-gray-200 font-bold cornerCutSmall transition"
            >
              Discord
            </a>
          </div>
        </div>
      </div>

      {/* Список карток */}
      {articles.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 grid-rows-[auto_auto_1fr_auto]">
          {articles.map((article) => (
            <Link
              key={article['page-link']}
              to={`/news/${article['page-link']}`}
              className="grid grid-rows-subgrid row-span-4 bg-green-900/20 cornerCut overflow-hidden hover:bg-green-900/40 transition"
            >
              {/* Рядок 1: Зображення */}
              {article.preview ? (
                <img
                  src={article.preview}
                  alt={article.title}
                  className="cornerCut w-full h-48 object-cover"
                />
              ) : (
                <div className="cornerCut w-full h-48 bg-gray-800" /> // Плейсхолдер
              )}
              
              {/* Рядок 2: Заголовок */}
              <h3 className="text-xl font-bold text-gray-200 pl-6 pr-6 pb-0">
                {article.title}
              </h3>
              
              {/* Рядок 3: Опис */}
              <p className="text-gray-400 text-sm pl-6 pr-6">
                {article.description}
              </p>

              {/* Рядок 4: Мета-інформація */}
              <div className="pl-6 pr-6 pb-6 mt-auto">
                <ArticleMeta
                  authors={article.authors}
                  author={article.author}
                  authorImg={article['author-img']}
                  editors={article.editors}
                  date={article.date}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}