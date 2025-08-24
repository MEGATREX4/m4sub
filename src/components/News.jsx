import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const newsArticles = await getAllNews();
        // Take only the last 3 articles
        setArticles(newsArticles.slice(0, 3));
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
              href="/discord" 
              className="text-center inline-block px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-gray-200 font-bold cornerCutSmall transition"
            >
              Discord
            </a>
          </div>
        </div>
      </div>

      {articles.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article['page-link']}
              to={`/news/${article['page-link']}`}
              className="bg-green-900/20 cornerCut overflow-hidden hover:bg-green-900/40 transition"
            >
              {article.preview && (
                <img
                  src={article.preview}
                  alt={article.title}
                  className="cornerCut w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-200 mb-2">{article.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{article.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  {article['author-img'] && (
                    <img
                      src={article['author-img']}
                      alt={article.author}
                      className="w-6 h-6 rounded-full"
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
      )}
    </section>
  );
}
  