// components/ArticleMeta.jsx
export default function ArticleMeta({
  authors,
  author,
  authorImg,
  date,
  formatDateStyle = "default", // new prop
}) {
  const normalized = authors ?? (author ? [{ name: author, mc: authorImg }] : []);

  // форматування дати
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (formatDateStyle === "long") {
      return d.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
    }
    // default формат
    return d.toLocaleDateString();
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-400 mt-auto flex-wrap">
      {/* Аватари з невеликим перекриттям */}
      <div className="flex">
        {normalized.map((a, idx) => (
          <div
            key={idx}
            className="relative"
            style={{
              marginLeft: idx === 0 ? 0 : -8,
              zIndex: normalized.length - idx,
            }}
          >
            {a.mc && (
              <img
                src={`https://nmsr.nickac.dev/face/${a.mc}`}
                alt={a.name}
                className="w-8 h-8 object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Всі ніки inline */}
      <span className="ml-2">
        {normalized.map((a, idx) => (
          <span key={idx}>
            {a.name}
            {idx < normalized.length - 1 && ", "}
          </span>
        ))}
      </span>

      {/* Дата */}
      <time dateTime={date}>{formatDate(date)}</time>
    </div>
  );
}
