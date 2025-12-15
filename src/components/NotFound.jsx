// NotFound.jsx
import { Link } from "react-router-dom";
import { BorderBox } from "./donate/components/BorderBox";

export default function NotFound() {
  return (
    <section className="max-w-lg mx-auto px-4 py-24">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
        <div className="p-8 text-center">
          <div className="text-8xl font-bold text-[#c5629a] minecraftFont mb-4">404</div>
          <h1 className="text-2xl font-bold text-white minecraftFont mb-2">
            Сторінку не знайдено
          </h1>
          <p className="text-gray-400 mb-8">
            Схоже, ця сторінка загубилася в Незері...
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5629a] hover:bg-[#f390d0] text-white font-bold minecraftFont cornerCutSmall transition-colors"
          >
            <i className="hn hn-home"></i>
            На головну
          </Link>
        </div>
      </BorderBox>
    </section>
  );
}