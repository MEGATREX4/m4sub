import { Link } from "react-router-dom";

export default function Detailed({ items }) {
  return (
    <section
      className="grid gap-2 justify-items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 320px))",
        width: "calc(100% - 20px)",
        justifyContent: "center" // This centers the grid items horizontally
      }}
    >
      {items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="bg-green-900/20 pixelcut rounded-lg grid text-center text-gray-200 hover:bg-green-900/40 transition p-4"
          style={{
            width: "300px",
            height: "300px",
            display: "grid",
            gridTemplateRows: "subgrid",
            gridRow: "span 3"
          }}
        >
          <img src={item.image} alt={item.title} className="w-40 h-40 object-contain mx-auto" />
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
        </Link>
      ))}
    </section>
  );
}
