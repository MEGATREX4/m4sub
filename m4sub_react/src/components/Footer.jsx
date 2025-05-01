export default function Footer() {
    return (
      <footer className="bg-green-900/10 py-4 flex justify-between items-center px-8 text-gray-200">
        <ul>
          <li className="text-center">© M4SUB - Minecraft</li>
          <li className="text-center">Іконки - HackerNoon</li>
          <li className="text-center">Tailwind CSS</li>
        </ul>
  
        <ul className="flex gap-4">
          <li>
            <a href="https://discord.gg/2TxYxe7cbp" target="_blank" className="group">
              <img src="/icons/light-discord.png" alt="Discord" className="w-8 h-8 md:w-10 md:h-10 group-hover:filter group-hover:invert-[0.1]" />
            </a>
          </li>
          <li>
            <a href="https://www.x.com/m4subclick" target="_blank" className="group">
              <img src="/icons/x.png" alt="X" className="w-8 h-8 md:w-10 md:h-10 group-hover:filter group-hover:invert-[0.1]" />
            </a>
          </li>
        </ul>
      </footer>
    );
  }
  