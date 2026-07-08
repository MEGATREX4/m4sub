// NewsList.jsx
import { useEffect, useState } from 'react';
import { getAllNews } from '../utils/frontmatter';
import Page from './Page';
import NewsCard, { NEWS_GRID_ROWS } from './NewsCard';
import { BorderBox } from './donate/components/BorderBox';
import CascadeLoader from './CascadeLoader';

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
        {loading && (
          <CascadeLoader label="Завантаження новин..." className="min-h-[50vh]" />
        )}

        {error && (
          <BorderBox borderColor="bg-red-500" innerBg="bg-red-900/20">
            <div className="p-6 text-center text-red-300">{error}</div>
          </BorderBox>
        )}

        {!loading && !error && articles.length === 0 && (
          <BorderBox borderColor="bg-gray-600" innerBg="bg-[#1a1a2e]">
            <div className="p-6 text-center text-gray-400">Статей не знайдено.</div>
          </BorderBox>
        )}

        {!loading && !error && articles.length > 0 && (
          <div
            className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3"
            style={{ gridTemplateRows: NEWS_GRID_ROWS }}
          >
            {articles.map((article) => (
              <NewsCard key={article['page-link']} article={article} />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
