export default function Features() {
    const features = ["Рідкі вайпи", "Унікальні сервери", "Івенти", "Власні плагіни"];
  
    return (
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img src="/axo.png" alt="Переваги" className="w-64 h-64 md:w-80 md:h-80 mx-auto transform md:scale-x-[-1]" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-200">Переваги гри на M4SUB</h2>
          <ul className="mb-4 list-none list-inside">
            {features.map((feature, index) => (
              <li key={index} className="mt-3 flex items-center">
                <img src="/icons/point.png" alt="Point icon" className="invert-[1] w-4 h-4 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  