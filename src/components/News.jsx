// News.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';
import NewsCard, { NEWS_GRID_ROWS } from './NewsCard';
import { BorderBox } from './donate/components/BorderBox';
import CascadeLoader from './CascadeLoader';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const newsArticles = await getAllNews();
        setArticles(newsArticles.slice(0, 3));
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="mt-2">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div className="flex justify-center">
              <img src="/news.png" alt="Новини" className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-[0_0_20px_rgba(197,98,154,0.4)]" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white minecraftFont mb-3 flex items-center justify-center md:justify-start gap-3">
                <i className="hn hn-newspaper text-[#c5629a]"></i>
                Останні новини
              </h2>
              <p className="text-gray-300 mb-6">Слідкуйте за останніми подіями на нашому сервері</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-white font-bold minecraftFont cornerCutSmall transition-colors"
                >
                  <i className="hn hn-list"></i>
                  Усі новини
                </Link>
                <a
                  href="https://discord.gg/fxqnU9by3M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold minecraftFont cornerCutSmall transition-colors"
                >
                  <i className="hn hn-discord"></i>
                  Discord
                </a>
              </div>
            </div>
          </div>

          {loading ? (
            <CascadeLoader label="Завантаження новин..." className="py-8" />
          ) : articles.length > 0 && (
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
      </BorderBox>
    </section>
  );
}
