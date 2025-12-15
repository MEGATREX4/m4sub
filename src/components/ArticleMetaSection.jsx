import React from 'react';
import { BorderBox } from './donate/components/BorderBox';
import AlsoOnLinks from './AlsoOnLinks';
import ShareButtons from './ShareButtons';

export default function ArticleMetaSection({ alsoOn, shareInfo }) {
  const hasAlsoOn = alsoOn && alsoOn.length > 0;
  const hasShare = shareInfo && shareInfo.url;

  if (!hasAlsoOn && !hasShare) {
    return null;
  }

  return (
    <section className="mt-8">
      <BorderBox borderColor="bg-[#c5629a]/30" innerBg="bg-[#0a0a12]">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hasAlsoOn && <AlsoOnLinks links={alsoOn} />}
            {hasShare && <ShareButtons title={shareInfo.title} url={shareInfo.url} />}
          </div>
        </div>
      </BorderBox>
    </section>
  );
}