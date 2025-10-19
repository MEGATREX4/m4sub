import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import slugify from 'slugify';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';

import ReadingTime from './ReadingTime';
import ArticleNavigation from './ArticleNavigation';

import { parseFrontmatter, getAllNews } from '../utils/frontmatter';
import { newsManifest } from '../utils/newsManifest';
import Page from './Page';
import ArticleMeta from './ArticleMeta';

// Імпортуємо всі необхідні кастомні компоненти
import ImageGallery from './ImageGallery';
import YouTubePlayer from './YouTubePlayer';
import PlayerAvatar from './PlayerAvatar'; 
import TableOfContents from './TableOfContents';

import { CustomList, CustomListItem } from './CustomList';

export default function NewsArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ frontmatter: {}, content: '' });
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [readingTimeInSeconds, setReadingTimeInSeconds] = useState(0);

  const [navigation, setNavigation] = useState({ prev: null, next: null });

  // useEffect та useMemo залишаються без змін, оскільки вони працюють коректно
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setHeadings([]);
        setReadingTimeInSeconds(0);

        const articles = await getAllNews();

        // Знаходимо індекс поточної статті в масиві
        const currentIndex = articles.findIndex(art => art['page-link'] === slug);

        if (currentIndex === -1) {
          setLoading(false);
          navigate('/*', { replace: true });
          return;
        }

        // Визначаємо попередню та наступну статті з "зациклюванням"
        const prevIndex = (currentIndex - 1 + articles.length) % articles.length;
        const nextIndex = (currentIndex + 1) % articles.length;
        
        setNavigation({
          prev: articles[prevIndex],
          next: articles[nextIndex]
        });

        const matchingArticle = articles.find(art => art['page-link'] === slug);
        if (!matchingArticle) { setLoading(false); navigate('/*', { replace: true }); return; }
        const manifestItem = newsManifest.find(item => item.pageLink === matchingArticle['page-link']);
        if (!manifestItem) { setLoading(false); navigate('/*', { replace: true }); return; }
        
        const data = await parseFrontmatter(`/news/${manifestItem.filename}`);
        setArticle(data);

        if (data.content) {
          const wordsPerMinute = 200;
          const wordCount = data.content.split(/\s+/).length;
          
          // Рахуємо загальну кількість секунд
          const totalSeconds = Math.floor((wordCount / wordsPerMinute) * 60);
          setReadingTimeInSeconds(totalSeconds);
        }

        if (data.frontmatter.generateTOC) {
          const extractedHeadings = [];
          remark()
            .use(() => (tree) => {
              visit(tree, 'heading', (node) => {
                if (node.depth === 2 || node.depth === 3) {
                  const text = toString(node);
                  const slug = slugify(text, { lower: true, strict: true });
                  extractedHeadings.push({ level: node.depth, text, slug });
                }
              });
            })
            .processSync(data.content);
          setHeadings(extractedHeadings);
        }
      } catch (error) { console.error('Error fetching article:', error); navigate('/*', { replace: true }); }
      finally { setLoading(false); }
    };
    fetchArticle();
  }, [slug, navigate]);
  
  const processedContent = useMemo(() => {
    if (!article.content) return '';
    const MENTION_REGEX = /@((?:[a-zA-Z0-9_]|\\_){3,16})/g;
    return article.content.replace(MENTION_REGEX, (match, username) => {
      return `<playeravatar username="${username}"></playeravatar>${match}`;
    });
  }, [article.content]);

  if (loading) return (
    <Page title="Завантаження..."><div className="flex justify-center items-center min-h-[50vh]"><div className="text-gray-400">Завантаження статті...</div></div></Page>
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

      {/* --- ЗМІНА №1: Додаємо overflow-x-hidden --- */}
      <article className="prose prose-invert max-w-3xl mx-auto py-8 px-4 overflow-x-hidden">
        <header className="mb-8">
            {article.frontmatter.preview && (
            <img src={article.frontmatter.preview} alt={article.frontmatter.title} className="w-full h-72 object-cover mb-4 cornerCut"/>
          )}
          <h1 className="text-3xl font-bold mb-2">{article.frontmatter.title}</h1>
          <ArticleMeta 
            authors={article.frontmatter.authors} 
            author={article.frontmatter.author} 
            authorImg={article.frontmatter["author-img"]} 
            editors={article.frontmatter.editors}
            date={article.frontmatter.date} 
            formatDateStyle="long"
            variant="full"
          />
        </header>

        <ReadingTime totalSeconds={readingTimeInSeconds} />

        {article.frontmatter.generateTOC && headings.length > 0 && (
          <TableOfContents headings={headings} />
        )}

        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              
              a: ({ node, href, children, ...props }) => {
                // Перевіряємо, чи є посилання зовнішнім
                const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

                // Якщо посилання зовнішнє, рендеримо звичайний тег <a> з іконкою
                if (isExternal) {
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-[#f390d0] no-underline hover:text-[#c5629a] transition-colors"
                      {...props}
                    >
                      {children}
                      <i className="hn hn-external-link-solid text-sm align-middle"></i>
                    </a>
                  );
                }

                // Якщо посилання внутрішнє, використовуємо Link з react-router-dom
                return (
                  <Link 
                    to={href || '#'} 
                    className="text-[#f390d0] no-underline hover:text-[#c5629a] transition-colors"
                    {...props}
                  >
                    {children}
                  </Link>
                );
              },

              ul: CustomList,
              ol: CustomList,
              li: CustomListItem,

              h1: ({ node, children, ...props }) => {
                const text = toString(node);
                const id = slugify(text, { lower: true, strict: true });
                return <h1 id={id} {...props} className="text-3xl font-bold mb-4">{children}</h1>;
              },

              h2: ({ node, children, ...props }) => {
                const text = toString(node);
                const id = slugify(text, { lower: true, strict: true });
                return <h2 id={id} {...props} className="text-2xl font-bold mb-4">{children}</h2>;
              },
              h3: ({ node, children, ...props }) => {
                const text = toString(node);
                const id = slugify(text, { lower: true, strict: true });
                return <h3 id={id} {...props} className="text-xl font-bold mb-4">{children}</h3>;
              },
              playeravatar: ({ node, ...props }) => <PlayerAvatar username={props.username} />,
              p: ({ node, children }) => {
                if (node.children[0]?.tagName === "img" && node.children[0]?.properties?.src?.includes("youtube")) {
                  return <>{children}</>;
                }
                return <p className="text-gray-300 leading-relaxed my-4">{children}</p>;
              },
              
              // --- ЗМІНА №2: Адаптивність для img ---
              img: ({ node, src, alt, ...props }) => {
                const isYouTube = src && (src.includes('youtube.com') || src.includes('youtu.be'));
                if (isYouTube) return <YouTubePlayer url={src} title={alt} />;
                return <img src={src} alt={alt || ''} {...props} className="cornerCut shadow-lg my-6 mx-auto max-w-full h-auto" loading="lazy" />;
              },
              
              // --- ЗМІНА №3: Адаптивність для таблиць ---
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table {...props} className="w-full" />
                </div>
              ),

              // --- ЗМІНА №4: Адаптивність для блоків коду ---
              preformat: ({ node, ...props }) => (
                <pre 
                  {...props} 
                  className="bg-gray-800/50 border border-gray-700 p-4 my-6 text-gray-300 overflow-x-auto whitespace-pre-wrap break-words" 
                />
              ),
              code: ({ node, inline, ...props }) => inline 
                ? <code {...props} className="font-mono bg-[#2d1a23] px-1.5 py-0.5 cornerCut text-[#f390d0]" /> 
                : <pre className="block overflow-x-auto whitespace-pre-wrap break-words"><code {...props} /></pre>,
              
              // ...решта компонентів
              gallery: ({ node, ...props }) => <ImageGallery path={props.path} />,
              blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-pink-500 pl-4 italic my-6 text-gray-300" />,
              a: ({ node, ...props }) => <Link {...props} className="text-[#f390d0] no-underline hover:text-[#c5629a] transition-colors" />,
              h1: ({ node, ...props }) => <h1 {...props} className="text-4xl font-bold mb-4" />,
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>

        <ArticleNavigation 
          prevArticle={navigation.prev} 
          nextArticle={navigation.next} 
        />
      </article>
    </Page>
  );
}