import React from 'react';

export default function ArticleDate({ date }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return d.toLocaleDateString("uk-UA", options);
  };

  if (!date) {
    return null;
  }

  return (
    <div className="flex gap-2 text-sm text-gray-400 !items-center">
      <i className="hn hn-calendar-days-solid"></i>
      <time dateTime={date}>{formatDate(date)}</time>
    </div>
  );
}