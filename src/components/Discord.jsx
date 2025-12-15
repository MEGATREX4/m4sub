// Discord.jsx
import { BorderBox } from "./donate/components/BorderBox";

export default function Discord() {
  return (
    <section className="mt-12">
      <BorderBox borderColor="bg-[#5865f2]" innerBg="bg-[#0a0a12]">
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5865f2]/20 cornerCutSmall mb-4">
            <i className="hn hn-discord text-3xl text-[#5865f2]"></i>
          </div>
          
          <h2 className="text-2xl font-bold text-white minecraftFont mb-3">
            Приєднуйтесь до спільноти!
          </h2>
          
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Спілкуйтеся з іншими гравцями та адміністрацією на нашому Discord-сервері.
          </p>
          
          <a
            href="https://discord.gg/fxqnU9by3M"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold minecraftFont cornerCutSmall transition-colors hover:scale-105 transform"
          >
            <i className="hn hn-external-link"></i>
            Перейти до Discord
          </a>
        </div>
      </BorderBox>
    </section>
  );
}