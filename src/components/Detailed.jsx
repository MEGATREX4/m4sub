import { Link } from "react-router-dom";

export default function Detailed({ items }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 justify-center place-items-center">
      {items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="bg-green-900/20 pixelcut aspect-square w-80 rounded-lg flex flex-col justify-center items-center text-center text-gray-200 hover:bg-green-900/40 transition p-6"
        >
          <img src={item.image} alt={item.title} className="w-32 h-32 mb-4 object-contain" />
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
        </Link>
      ))}
    </section>
  );
}
