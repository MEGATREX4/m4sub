import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';
import Page from './Page';
import ArticleMeta from './ArticleMeta';

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const newsArticles = await getAllNews();
        setArticles(newsArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Не вдалося завантажити статті');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Page title="M4SUB - Новини">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-200 mb-8">Останні новини</h1>
        
        {loading && (
          <div className="text-gray-400 text-center py-10">Завантаження статей...</div>
        )}
        
        {error && (
          <div className="text-red-400 text-center py-10">{error}</div>
        )}
        
        {!loading && !error && articles.length === 0 && (
          <div className="text-gray-400 text-center py-10">Статей не знайдено.</div>
        )}
        
        {/* --- ГОЛОВНА БАТЬКІВСЬКА СІТКА --- */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 grid-rows-[auto_auto_1fr_auto]">
          {articles.map((article) => (
            // --- КАРТКА ЯК SUBGRID ---
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
              <p className="text-gray-400 text-sm pl-6 pr-6 pb-0">
                {article.description}
              </p>

              {/* Рядок 4: Мета-інформація */}
              <div className="pl-6 pr-6 pt-0 pb-6 mt-auto">
                <ArticleMeta
                  authors={article.authors}
                  author={article.author}
                  authorImg={article['author-img']}
                  editors={article.editors}
                  date={article.date}
                  tags={article.tags}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Page>
  );
}