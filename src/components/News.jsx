// News.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';
import ArticleMeta from './ArticleMeta';
import { BorderBox } from './donate/components/BorderBox';

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
    <section className="mt-12">
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
              <div className="h-[2px] bg-gradient-to-r from-[#c5629a] to-transparent mb-4"></div>
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
            <div className="flex items-center justify-center py-12">
              <i className="hn hn-spinner text-4xl text-[#c5629a] animate-spin"></i>
            </div>
          ) : articles.length > 0 && (
            /* Subgrid container */
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ gridTemplateRows: 'auto auto 1fr auto' }}>
              {articles.map((article) => (
                <Link
                  key={article['page-link']}
                  to={`/news/${article['page-link']}`}
                  className="group grid grid-rows-subgrid row-span-4 bg-[#1a1a2e] hover:bg-[#2a1a3e] border border-[#c5629a]/30 hover:border-[#c5629a] transition-all overflow-hidden"
                >
                  {/* Row 1: Image */}
                  {article.preview ? (
                    <img src={article.preview} alt={article.title} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-[#130217]" />
                  )}
                  
                  {/* Row 2: Title */}
                  <h3 className="text-lg font-bold text-white minecraftFont px-4 pt-4 group-hover:text-[#c5629a] transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Row 3: Description (flex-grows) */}
                  <p className="text-gray-400 text-sm px-4 line-clamp-3">
                    {article.description}
                  </p>
                  
                  {/* Row 4: Meta */}
                  <div className="px-4 pb-4 mt-auto">
                    <ArticleMeta
                      authors={article.authors}
                      author={article.author}
                      authorImg={article['author-img']}
                      date={article.date}
                      tags={article.tags}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </BorderBox>
    </section>
  );
}