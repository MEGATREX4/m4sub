// NewsList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/frontmatter';
import Page from './Page';
import ArticleMeta from './ArticleMeta';
import Hero from './Hero';
import { BorderBox } from './donate/components/BorderBox';

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
          <div className="flex items-center justify-center py-20">
            <i className="hn hn-spinner text-4xl text-[#c5629a] animate-spin"></i>
          </div>
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
          /* Subgrid container */
          <div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
            style={{ gridTemplateRows: 'auto auto 1fr auto' }}
          >
            {articles.map((article) => (
              <Link
                key={article['page-link']}
                to={`/news/${article['page-link']}`}
                className="group grid grid-rows-subgrid row-span-4 bg-[#0a0a12] border-[3px] border-[#c5629a]/30 hover:border-[#c5629a] transition-all duration-200 hover:translate-y-[-4px] overflow-hidden"
              >
                {/* Row 1: Image */}
                {article.preview ? (
                  <img src={article.preview} alt={article.title} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-[#1a1a2e]" />
                )}
                
                {/* Row 2: Title */}
                <h3 className="text-lg font-bold text-white minecraftFont px-5 pt-4 group-hover:text-[#c5629a] transition-colors">
                  {article.title}
                </h3>
                
                {/* Row 3: Description (flex-grows) */}
                <p className="text-gray-400 text-sm px-5 line-clamp-3">
                  {article.description}
                </p>
                
                {/* Row 4: Meta */}
                <div className="px-5 pb-5 mt-auto">
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
    </Page>
  );
}