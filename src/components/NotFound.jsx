import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="text-center flex flex-col items-center justify-center py-24 text-gray-200">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-xl mb-8">Сторінку не знайдено :(</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#c5629a] hover:bg-[#f390d0] text-white font-bold rounded transition"
      >
        На головну
      </Link>
    </section>
  );
}
