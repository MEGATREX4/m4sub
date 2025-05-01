export default function Footer() {
  return (
    <footer className="bg-green-900/20 py-4 flex justify-between items-center px-8 text-gray-200">
      <ul>
        <li className="text-center">© M4SUB - Minecraft</li>
        <li className="text-center">Іконки - Pixel Icon Library</li>
        <li className="text-center">Tailwind CSS</li>
      </ul>

      <ul className="flex gap-4 text-2xl">
        <li>
          <a href="https://discord.gg/2TxYxe7cbp" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/discord.png" alt="Discord icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
        </li>
        <li>
          <a href="https://www.x.com/m4subclick" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/x.png" alt="X icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
