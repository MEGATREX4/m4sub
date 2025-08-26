export default function Footer() {
  return (
    <footer className="bg-green-900/20 py-8 px-8 text-gray-200 space-y-6">
      {/* Верхній блок з двома колонками */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ліва колонка */}
        <div className="flex flex-col gap-2">
          <ul>
            <li>© M4SUB - Minecraft</li>
            <li>Іконки - Pixel Icon Library</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        {/* Права колонка */}
        <div className="flex justify-center md:justify-end items-center gap-4">
          <a href="https://discord.gg/fxqnU9by3M" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/discord.png" alt="Discord icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
          <a href="https://www.x.com/m4subclick" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/x.png" alt="X icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
          <a href="https://soc.ua-fediland.de/@m4subclick" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/mastodon.png" alt="Mastodon icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
          <a href="https://bsky.app/profile/m4sub.bsky.social" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/bluesky.png" alt="Bluesky icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
          <a href="https://www.instagram.com/m4sub.click/" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/instagram.png" alt="Instagram icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
          <a href="https://www.threads.com/@m4sub.click" target="_blank" rel="noreferrer" className="group">
            <img src="/icons/threads.png" alt="Threads icon" className="w-8 h-8 group-hover:invert-[0.5] transition" />
          </a>
        </div>
      </div>

      {/* Нижній блок з юридичним текстом */}
      <div className="text-center text-sm-1 font-bold text-gray-400">
        NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
      </div>
    </footer>
  );
}
