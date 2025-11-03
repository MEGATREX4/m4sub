import React from 'react';

const TAG_COLORS = {
  'оновлення': 'bg-blue-900/60',
  'спільнота': 'bg-emerald-900/60',
  'плагіни':   'bg-amber-900/60',
  'івент':     'bg-purple-900/60',
  'конкурс':   'bg-red-900/60',
  'саб':       'bg-fuchsia-900/60',
};

const RANDOM_COLORS = [
  'bg-pink-900/60',
  'bg-teal-900/60',
  'bg-indigo-900/60',
  'bg-rose-900/60',
    'bg-lime-900/60',
    'bg-cyan-900/60',
    'bg-violet-900/60',
    'bg-fuchsia-900/60',
];

export default function ArticleTags({ tags }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  const getTagBgClass = (tag, index) => {
    const normalizedTag = tag.toLowerCase();

    if (TAG_COLORS[normalizedTag]) {
      return TAG_COLORS[normalizedTag];
    }

    return RANDOM_COLORS[index % RANDOM_COLORS.length];
  };

  return (

    <div className="flex items-center flex-wrap gap-x-3 gap-y-2 text-sm text-gray-400">
      <i className="hn hn-tag-solid text-base flex-shrink-0"></i>
      
      {tags.map((tag, index) => {
        const bgColorClass = getTagBgClass(tag, index);
        
        return (
          <div
            key={index}
            to={`/tags/${encodeURIComponent(tag.toLowerCase())}`}

            className={`${bgColorClass} p-3 cornerCutSmall text-xs text-gray-200 no-underline`}
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
}