import React from 'react';
import AlsoOnLinks from './AlsoOnLinks';
import ShareButtons from './ShareButtons';

export default function ArticleMetaSection({ alsoOn, shareInfo }) {
  const hasAlsoOn = alsoOn && alsoOn.length > 0;
  const hasShare = shareInfo && shareInfo.url;

  if (!hasAlsoOn && !hasShare) {
    return null;
  }

  return (
    <section className="my-8 bg-green-900/20 p-6 cornerCut">
      {/* Use Grid for a responsive two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* "Also On" column */}
        {hasAlsoOn && <AlsoOnLinks links={alsoOn} />}
        
        {/* "Share" column */}
        {hasShare && <ShareButtons title={shareInfo.title} url={shareInfo.url} />}
        
      </div>
    </section>
  );
}