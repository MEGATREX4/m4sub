import { Link } from 'react-router-dom';
import ArticleTags from './ArticleTags';

const normalizeContributors = (authors, author, authorImg) => {
  if (Array.isArray(authors)) return authors;
  if (typeof authors === 'string') return [{ name: authors, mc: authors }];
  if (author) return [{ name: author, mc: authorImg || author }];
  return [];
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

export const NEWS_GRID_ROWS = 'repeat(6, auto)';

export default function NewsCard({ article }) {
  const contributors = normalizeContributors(
    article.authors,
    article.author,
    article['author-img']
  );
  const uniqueContributors = contributors.filter(
    (person, index, self) => index === self.findIndex((p) => p.mc === person.mc)
  );

  return (
    <Link
      to={`/news/${article['page-link']}`}
      className="group row-span-6 grid grid-rows-subgrid bg-[#1a1a2e] hover:bg-[#2a1a3e] border border-[#c5629a]/30 hover:border-[#c5629a] transition-all overflow-hidden"
      style={{ display: 'grid', gridTemplateRows: 'subgrid', gridRow: 'span 6' }}
    >
      {/* Row 1: Image */}
      <div className="self-stretch" style={{ gridRow: '1' }}>
        {article.preview ? (
          <img
            src={article.preview}
            alt={article.title}
            className="w-full h-44 object-cover"
          />
        ) : (
          <div className="w-full h-44 bg-[#130217]" />
        )}
      </div>

      {/* Row 2: Title */}
      <h3
        className="self-start w-full text-lg font-bold text-white minecraftFont px-5 pt-4 group-hover:text-[#c5629a] transition-colors leading-snug"
        style={{ gridRow: '2' }}
      >
        {article.title}
      </h3>

      {/* Row 3: Description */}
      <p
        className="self-start w-full text-gray-300 !text-sm px-5 leading-relaxed line-clamp-3"
        style={{ gridRow: '3' }}
      >
        {article.description}
      </p>

      {/* Row 4: Authors */}
      <div
        className="self-start w-full flex items-center gap-2 px-5 text-sm text-gray-400 minecraftFont flex-wrap"
        style={{ gridRow: '4' }}
      >
        {uniqueContributors.length > 0 && (
          <>
            <div className="flex flex-shrink-0">
              {uniqueContributors.map((person, idx) => (
                <div
                  key={person.mc || idx}
                  className="relative"
                  style={{
                    marginLeft: idx === 0 ? 0 : -8,
                    zIndex: uniqueContributors.length - idx,
                  }}
                  title={person.name}
                >
                  {person.mc && (
                    <img
                      src={`https://nmsr.nickac.dev/face/${person.mc}`}
                      alt={person.name}
                      className="w-8 h-8 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
            <span>
              {uniqueContributors.map((person, idx) => (
                <span key={person.mc || idx}>
                  {person.name}
                  {idx < uniqueContributors.length - 1 && ', '}
                </span>
              ))}
            </span>
          </>
        )}
      </div>

      {/* Row 5: Tags */}
      <div className="self-start w-full px-5" style={{ gridRow: '5' }}>
        <ArticleTags tags={article.tags} />
      </div>

      {/* Row 6: Date */}
      <div
        className="self-start w-full flex items-center gap-2 px-5 pb-5 text-sm text-gray-400 minecraftFont"
        style={{ gridRow: '6' }}
      >
        {article.date && (
          <>
            <i className="hn hn-calendar-days-solid"></i>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </>
        )}
      </div>
    </Link>
  );
}
