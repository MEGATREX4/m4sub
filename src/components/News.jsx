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
              href="/discord" 
              className="text-center inline-block px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-gray-200 font-bold cornerCutSmall transition"
            >
              Discord
            </a>
          </div>
        </div>
      </div>

      {/* Список карток */}
      {articles.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
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
                
                <ArticleMeta
                  authors={article.authors}
                  author={article.author}
                  authorImg={article['author-img']}
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
