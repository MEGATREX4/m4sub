import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';
import Page from './Page';

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
        setError('Failed to load articles');
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
          <div className="text-gray-400 text-center">Завантаження статей...</div>
        )}
        
        {error && (
          <div className="text-red-400 text-center">{error}</div>
        )}
        
        {!loading && !error && articles.length === 0 && (
          <div className="text-gray-400 text-center">Статей не знайдено.</div>
        )}
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
          <Link
            key={article['page-link']}
            to={`/news/${article['page-link']}`}
            className="bg-green-900/20 cornerCut overflow-hidden hover:bg-green-900/40 transition grid grid-rows-[auto_1fr_auto]"
          >
            {article.preview && (
              <img
                src={article.preview}
                alt={article.title}
                className="cornerCut w-full h-48 object-cover"
              />
            )}
            <div className="p-[1.5rem] flex flex-col">
              <h3 className="text-xl font-bold text-gray-200 mb-2">{article.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{article.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto">
                {article['author-img'] && (
                  <img
                    src={`https://www.mc-heads.net/avatar/${article['author-img']}`}
                    alt={article.author}
                    className="w-6 h-6"
                  />
                )}
                <span>{article.author}</span>
                <span>•</span>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString()}
                </time>
              </div>
            </div>
          </Link>

          ))}
        </div>
      </div>
    </Page>
  );
}
