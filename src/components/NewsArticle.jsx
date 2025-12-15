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
import { BorderBox } from './donate/components/BorderBox';

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

const mcTexture = (name) => `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

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
      } catch (error) { 
        console.error('Error fetching article:', error); 
        navigate('/*', { replace: true }); 
      }
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

  if (loading) {
    return (
      <Page title="Завантаження...">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
            <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] gap-4">
              <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-md">
                <div className="h-8 bg-gray-700/50 w-3/4"></div>
                <div className="h-4 bg-gray-700/50 w-1/2"></div>
                <div className="h-48 bg-gray-700/50 w-full mt-4"></div>
              </div>
              <p className="text-gray-400 mt-4">Завантаження статті...</p>
            </div>
          </BorderBox>
        </div>
      </Page>
    );
  }
  
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
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Article Header */}
        <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
          <article className="overflow-hidden">
            {/* Preview Image */}
            {article.frontmatter.preview && (
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img 
                  src={article.frontmatter.preview} 
                  alt={article.frontmatter.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"></div>
              </div>
            )}
            
            {/* Article Header Content */}
            <header className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white minecraftFont mb-4 leading-tight">
                {article.frontmatter.title}
              </h1>
              
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
              
              <div className="mt-4">
                <ReadingTime totalSeconds={readingTimeInSeconds} />
              </div>
            </header>
          </article>
        </BorderBox>

        {/* Table of Contents */}
        {article.frontmatter.generateTOC && headings.length > 0 && (
          <div className="mt-6">
            <TableOfContents headings={headings} />
          </div>
        )}

        {/* Article Content */}
        <div className="mt-6">
          <BorderBox borderColor="bg-gray-700/50" innerBg="bg-[#0a0a12]/80">
            <div className="p-6 sm:p-8 prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  a: ({ node, href, children, ...props }) => {
                    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
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
                          <i className="hn hn-arrow-alt-circle-up text-sm align-middle"></i>
                        </a>
                      );
                    }
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
                  h1: ({ node, children, ...props }) => (
                    <h1 
                      id={slugify(toString(node), { lower: true, strict: true })} 
                      {...props} 
                      className="text-3xl font-bold text-white minecraftFont mb-4 mt-8 first:mt-0"
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ node, children, ...props }) => (
                    <h2 
                      id={slugify(toString(node), { lower: true, strict: true })} 
                      {...props} 
                      className="text-2xl font-bold text-[#f390d0] minecraftFont mb-4 mt-8 flex items-center gap-3"
                    >
                      <i className="hn hn-angle-right text-[#c5629a] text-sm"></i>
                      {children}
                    </h2>
                  ),
                  h3: ({ node, children, ...props }) => (
                    <h3 
                      id={slugify(toString(node), { lower: true, strict: true })} 
                      {...props} 
                      className="text-xl font-bold text-[#c5629a] mb-3 mt-6"
                    >
                      {children}
                    </h3>
                  ),
                  h4: ({ node, children, ...props }) => (
                    <h4 
                      id={slugify(toString(node), { lower: true, strict: true })} 
                      {...props} 
                      className="text-lg font-bold text-gray-300 mb-2 mt-4"
                    >
                      {children}
                    </h4>
                  ),
                  hr: ({ node, ...props }) => (
                                  <div className="my-5 flex items-center gap-2">
            <div className="flex-1 flex h-[3px]">
              <div className="flex-1 bg-[#2a0a1a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#c5629a]"></div>
            </div>
            <img 
              src={mcTexture("nether_star")} 
              alt="Nether Star" 
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="flex-1 flex h-[3px]">
              <div className="flex-1 bg-[#c5629a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#2a0a1a]"></div>
            </div>
          </div>
                  ),
                  playeravatar: ({ node, ...props }) => <PlayerAvatar username={props.username} />,
                  
                  p: ({ node, children }) => {
                    const hasCustomComponent = node.children.some(child => 
                      child.tagName === 'minecraftmodel' ||
                      child.tagName === 'capewings' ||
                      child.tagName === 'gallery' ||
                      (child.tagName === 'img' && child.properties?.src?.includes('youtube'))
                    );
                    
                    if (hasCustomComponent) {
                      return <>{children}</>;
                    }
                    
                    const textContent = React.Children.toArray(children).join('').trim();
                    if (!textContent) {
                      return null;
                    }
                    
                    return <p className="text-gray-300 leading-relaxed my-4">{children}</p>;
                  },
                  
                  img: ({ node, src, alt, ...props }) => {
                    const isYouTube = src && (src.includes('youtube.com') || src.includes('youtu.be'));
                    if (isYouTube) return <YouTubePlayer url={src} title={alt} />;
                    return (
                      <figure className="my-6">
                        <img 
                          src={src} 
                          alt={alt || ''} 
                          {...props} 
                          className="w-full h-auto shadow-lg" 
                          loading="lazy" 
                        />
                      </figure>
                    );
                  },
                  
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <BorderBox borderColor="bg-gray-700/30" innerBg="bg-[#1a1a2e]/50">
                        <table {...props} className="w-full text-left" />
                      </BorderBox>
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead {...props} className="bg-[#c5629a]/20 text-[#f390d0]" />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="px-4 py-3 font-bold minecraftFont text-sm border-b border-gray-700/50" />
                  ),
                  td: ({ node, ...props }) => (
                    <td {...props} className="px-4 py-3 text-gray-300 border-b border-gray-700/30" />
                  ),
                  
                  pre: ({ node, ...props }) => (
                    <pre {...props} className="bg-[#1a1a2e] border border-gray-700/50 p-4 my-6 text-gray-300 overflow-x-auto whitespace-pre-wrap break-words text-sm"/>
                  ),
                  
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
                    ? <code {...props} className="font-mono bg-[#2d1a23] px-1.5 py-0.5 text-[#f390d0] text-sm" />
                    : <pre className="block overflow-x-auto whitespace-pre-wrap break-words"><code {...props} /></pre>,
                  
                  gallery: ({ node, ...props }) => <ImageGallery path={props.path} />,
                  
                  blockquote: ({ node, ...props }) => (
                    <blockquote 
                      {...props} 
                      className="border-l-4 border-[#c5629a] bg-[#c5629a]/10 pl-4 pr-4 py-3 italic my-6 text-gray-300" 
                    />
                  ),
                }}
              >     
                {processedContent}
              </ReactMarkdown>
            </div>
          </BorderBox>
        </div>

        {/* Article Meta Section */}
        <ArticleMetaSection
          alsoOn={article.frontmatter['also-on']}
          shareInfo={{ title: article.frontmatter.title, url: articleUrl }}
        />
        
        {/* Navigation */}
        <ArticleNavigation 
          prevArticle={navigation.prev} 
          nextArticle={navigation.next} 
        />
        
        {/* Comments */}
        <Comments title={article.frontmatter.title} />
      </div>
    </Page>
  );
}