import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { parseFrontmatter, getAllNews } from '../utils/frontmatter';
import { newsManifest } from '../utils/newsManifest';
import Page from './Page';

export default function NewsArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ frontmatter: {}, content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const articles = await getAllNews();
        const matchingArticle = articles.find(art => art['page-link'] === slug);

        if (!matchingArticle) {
          setLoading(false);
          navigate('/*', { replace: true });
          return;
        }

        // Тепер шукаємо filename у newsManifest по pageLink
        const manifestItem = newsManifest.find(item => item.pageLink === matchingArticle['page-link']);
        if (!manifestItem) {
          setLoading(false);
          navigate('/*', { replace: true });
          return;
        }

        const data = await parseFrontmatter(`/news/${manifestItem.filename}`);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/*', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString('uk-UA', options);
  };

  if (loading) return (
    <Page title="Завантаження...">
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-400">Завантаження статті...</div>
      </div>
    </Page>
  );

  if (!article.frontmatter || !article.content) return <Navigate to="/*" replace />;

  return (
    <Page
      title={article.frontmatter.title || 'Новини — M4SUB'}
      description={article.frontmatter.description}
      image={article.frontmatter.preview}
      type="article"
      author={article.frontmatter.author}
      keywords={`M4SUB, Minecraft, ${article.frontmatter.title}`}
    >
      <article className="prose prose-invert max-w-3xl mx-auto py-8 px-4">
        <header className="mb-8">
          {article.frontmatter.preview && (
            <img
              src={article.frontmatter.preview}
              alt={article.frontmatter.title}
              className="w-full h-72 object-cover mb-4 cornerCut"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{article.frontmatter.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            {article.frontmatter['author-img'] && (
              <img
                src={`https://www.mc-heads.net/avatar/${article.frontmatter['author-img']}`}
                alt={article.frontmatter.author}
                className="w-6 h-6"
              />
            )}
            <span>{article.frontmatter.author}</span>
            <span>•</span>
            <time dateTime={article.frontmatter.date}>{formatDate(article.frontmatter.date)}</time>
            {article.frontmatter.edited && article.frontmatter.edited !== article.frontmatter.date && (
              <>
                <span>•</span>
                <span className="text-sm">Оновлено: {formatDate(article.frontmatter.edited)}</span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-invert max-w-none ...">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ node, ...props }) => <Link {...props} className="text-[#f390d0] no-underline hover:text-[#c5629a] transition-colors" />,
              ul: ({ node, ...props }) => <ul {...props} className="space-y-3 my-6 list-none pl-4">{props.children}</ul>,
              ol: ({ node, ...props }) => <ol {...props} className="space-y-3 my-6 list-decimal list-inside">{props.children}</ol>,
              li: ({ node, ...props }) => (
                <li {...props} className="flex items-start gap-3 text-gray-300">
                  <img src="/icons/point.png" alt="bullet" className="w-4 h-4 mt-1.5 invert flex-shrink-0" />
                  <span>{props.children}</span>
                </li>
              ),
              code: ({ node, inline, ...props }) =>
                inline
                  ? <code {...props} className="font-mono bg-[#2d1a23] px-1.5 py-0.5 cornerCutSmall text-[#f390d0]" />
                  : <code {...props} className="block overflow-x-auto text-gray-300" />,
              img: ({ node, ...props }) => <img {...props} className="cornerCutSmall shadow-lg my-6 mx-auto" loading="lazy" alt={props.alt || ''} />,
              h1: ({ node, ...props }) => <h1 {...props} className="text-4xl font-bold mb-4" />,
              h2: ({ node, ...props }) => <h2 {...props} className="text-3xl font-bold mb-4" />,
              h3: ({ node, ...props }) => <h3 {...props} className="text-2xl font-bold mb-4" />,
              p: ({ node, ...props }) => <p {...props} className="text-gray-300 leading-relaxed my-4" />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </Page>
  );
}
