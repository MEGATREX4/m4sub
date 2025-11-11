import React, { useEffect, useState, useMemo } from 'react';
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

// Custom components
import ImageGallery from './ImageGallery';
import YouTubePlayer from './YouTubePlayer';
import PlayerAvatar from './PlayerAvatar'; 
import TableOfContents from './TableOfContents';
import ArticleMetaSection from './ArticleMetaSection';
import MinecraftModelViewer from './MinecraftModelViewer';
import CapeWingsViewer from './CapeWingsViewer';
import Comments from './Comments';
import { CustomList, CustomListItem } from './CustomList';

export default function NewsArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ frontmatter: {}, content: '' });
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const articleUrl = window.location.href;
  const [readingTimeInSeconds, setReadingTimeInSeconds] = useState(0);
  const [navigation, setNavigation] = useState({ prev: null, next: null });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setHeadings([]);
        setReadingTimeInSeconds(0);
        const articles = await getAllNews();
        const currentIndex = articles.findIndex(art => art['page-link'] === slug);

        if (currentIndex === -1) {
          setLoading(false);
          navigate('/*', { replace: true });
          return;
        }

        const prevIndex = (currentIndex - 1 + articles.length) % articles.length;
        const nextIndex = (currentIndex + 1) % articles.length;
        setNavigation({ prev: articles[prevIndex], next: articles[nextIndex] });

        const matchingArticle = articles.find(art => art['page-link'] === slug);
        if (!matchingArticle) { setLoading(false); navigate('/*', { replace: true }); return; }
        const manifestItem = newsManifest.find(item => item.pageLink === matchingArticle['page-link']);
        if (!manifestItem) { setLoading(false); navigate('/*', { replace: true }); return; }
        
        const data = await parseFrontmatter(`/news/${manifestItem.filename}`);
        setArticle(data);

        if (data.content) {
          const wordsPerMinute = 200;
          const wordCount = data.content.split(/\s+/).length;
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
                  extractedHeadings.push({ level: node.depth, text, slug: slugify(text, { lower: true, strict: true }) });
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
    const MINECRAFT_MODEL_REGEX = /<minecraftmodel\s+(.*?)\s*\/>/g;
    return article.content
      .replace(MENTION_REGEX, (match, username) => `<playeravatar username="${username}"></playeravatar>${match}`)
      .replace(MINECRAFT_MODEL_REGEX, (match, p1) => `<div class="minecraftmodel-block">${match}</div>`);
  }, [article.content]);

  if (loading) return <Page title="Завантаження..."><div className="flex justify-center items-center min-h-[50vh]"><div className="text-gray-400">Завантаження статті...</div></div></Page>;
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
            tags={article.frontmatter.tags}
            formatDateStyle="long"
            variant="full"
          />
        </header>

        <ReadingTime totalSeconds={readingTimeInSeconds} />
        {article.frontmatter.generateTOC && headings.length > 0 && <TableOfContents headings={headings} />}

        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ node, href, children, ...props }) => {
                const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
                if (isExternal) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#f390d0] no-underline hover:text-[#c5629a] transition-colors" {...props}>
                      {children}
                      <i className="hn hn-arrow-alt-circle-up text-sm align-middle"></i>
                    </a>
                  );
                }
                return <Link to={href || '#'} className="text-[#f390d0] no-underline hover:text-[#c5629a] transition-colors" {...props}>{children}</Link>;
              },
              ul: CustomList,
              ol: CustomList,
              li: CustomListItem,
              h1: ({ node, children, ...props }) => <h1 id={slugify(toString(node), { lower: true, strict: true })} {...props} className="text-4xl font-bold mb-4">{children}</h1>,
              h2: ({ node, children, ...props }) => <h2 id={slugify(toString(node), { lower: true, strict: true })} {...props} className="text-2xl font-bold mb-4">{children}</h2>,
              h3: ({ node, children, ...props }) => <h3 id={slugify(toString(node), { lower: true, strict: true })} {...props} className="text-xl font-bold mb-4">{children}</h3>,
              h4: ({ node, children, ...props }) => <h4 id={slugify(toString(node), { lower: true, strict: true })} {...props} className="text-lg font-bold mb-4">{children}</h4>,
              hr: ({ node, ...props }) => <hr className="my-8 border-gray-700" {...props} />,
              playeravatar: ({ node, ...props }) => <PlayerAvatar username={props.username} />,
              
              // =========================================================
              // THE CORRECT, SIMPLIFIED `p` MAPPING
              // =========================================================
              p: ({ node, children }) => {
                // Check if ANY child is a custom component
                const hasCustomComponent = node.children.some(child => 
                  child.tagName === 'minecraftmodel' ||
                  child.tagName === 'capewings' ||
                  child.tagName === 'gallery' ||
                  (child.tagName === 'img' && child.properties?.src?.includes('youtube'))
                );
                
                if (hasCustomComponent) {
                  // Don't wrap in paragraph if there are custom components
                  return <>{children}</>;
                }
                
                // Check if children is just whitespace
                const textContent = React.Children.toArray(children).join('').trim();
                if (!textContent) {
                  return null; // Don't render empty paragraphs
                }
                
                return <p className="text-gray-300 leading-relaxed my-4">{children}</p>;
              },
              // =========================================================
              
              img: ({ node, src, alt, ...props }) => {
                const isYouTube = src && (src.includes('youtube.com') || src.includes('youtu.be'));
                if (isYouTube) return <YouTubePlayer url={src} title={alt} />;
                return <img src={src} alt={alt || ''} {...props} className="cornerCut shadow-lg my-6 mx-auto max-w-full h-auto" loading="lazy" />;
              },
              table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table {...props} className="w-full" /></div>,
              pre: ({ node, ...props }) => <pre {...props} className="bg-gray-800/50 border border-gray-700 p-4 my-6 text-gray-300 overflow-x-auto whitespace-pre-wrap break-words"/>,
              
              // These mappings are correct and do not need to change.
              capewings: ({ node, ...props }) => {
                const key = `capewings-${props.capebackimage}-${props.capefrontimage}-${props.wingsimage}`;
                return (
                  <CapeWingsViewer
                    key={key}
                    capefrontimage={props.capefrontimage}
                    capebackimage={props.capebackimage}
                    wingsimage={props.wingsimage}
                  />
                );
              },
              
              minecraftmodel: ({ node, ...props }) => {
                return (
                  <MinecraftModelViewer 
                    key={`model-${props.image}`}
                    image={props.image}
                  />
                );
              },

              code: ({ node, inline, ...props }) => inline
                ? <code {...props} className="font-mono bg-[#2d1a23] px-1.5 py-0.5 cornerCut text-[#f390d0]" />
                : <pre className="block overflow-x-auto whitespace-pre-wrap break-words"><code {...props} /> </pre>,
              gallery: ({ node, ...props }) => <ImageGallery path={props.path} />,
              blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-pink-500 pl-4 italic my-6 text-gray-300" />,
            }}
          >     
            {processedContent}
          </ReactMarkdown>
        </div>

        <ArticleMetaSection
          alsoOn={article.frontmatter['also-on']}
          shareInfo={{ title: article.frontmatter.title, url: articleUrl }}
        />
        <ArticleNavigation 
          prevArticle={navigation.prev} 
          nextArticle={navigation.next} 
        />
        <Comments title={article.frontmatter.title} />
      </article>
    </Page>
  );
}