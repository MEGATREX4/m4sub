import { BorderBox } from './BorderBox';
import { ImagePixelated, ElementPixelated } from 'react-pixelate';
import { useState, useEffect } from 'react';

export const UkraineBanner = () => {
  const svgSources = {
    saveLife: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.2 1.8H1.8V22.2H22.2V1.8ZM0 0V24H24V0H0Z' fill='%23ffffff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.2912 11.3052C18.382 9.93354 18.195 8.02215 16.86 6.86343C16.1328 6.2296 15.1563 5.92259 14.1745 6.01667C13.3557 6.09474 12.5923 6.4516 12.0235 7.01149C12.015 7.01986 12.0065 7.02828 11.9981 7.03674C11.9895 7.02816 11.981 7.01962 11.9723 7.01112C11.4037 6.45144 10.6454 6.09472 9.82163 6.01667C8.84509 5.92259 7.86335 6.2296 7.13614 6.86343C5.80638 8.02215 5.61937 9.93354 6.705 11.3052L11.9981 17.9934L11.9929 18H12.0033L11.9981 17.9934L17.2912 11.3052ZM11.9981 15.0929L15.8823 10.1848C16.363 9.58047 16.2995 8.76036 15.6801 8.22278L15.6774 8.22036C15.3334 7.92061 14.8503 7.76016 14.3462 7.80846C13.9276 7.84838 13.5454 8.03356 13.2742 8.30617L11.9981 9.58907L10.7219 8.30617C10.4493 8.03207 10.0729 7.84854 9.65186 7.80865L9.64901 7.80838C9.15009 7.76031 8.6622 7.92107 8.31882 8.22036C7.70174 8.75806 7.63696 9.58232 8.11641 10.1881L11.9981 15.0929Z' fill='%23525252'/%3E%3C/svg%3E`,
    prytula: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 400 400' fill='none'%3E%3Cpath d='M400 166.67H0V233.34H400V166.67Z' fill='%23ffffff'/%3E%3Cpath d='M400 0H333.33V166.67H400V0Z' fill='%230052a3'/%3E%3Cpath d='M400 233.33H333.33V400H400V233.33Z' fill='%230052a3'/%3E%3Cpath d='M400 0H166.67V333.33H233.33V66.67H400V0Z' fill='%230052a3'/%3E%3Cpath d='M66.67 333.33V166.67H0V400H333.33V333.33H66.67Z' fill='%23ffffff'/%3E%3C/svg%3E`,
    united24: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 87 21' fill='none'%3E%3Cpath d='M30.5282 10.3277C30.5282 17.8847 26.0237 21 15.2643 21C4.50498 21 0 17.8847 0 10.3277V0.698289H10.5206V11.0943C10.5206 13.2391 12.4208 14.84 15.2639 14.84C18.107 14.84 20.0071 13.2391 20.0071 11.0943V0.698289H30.5277V10.3277H30.5282ZM86.4917 11.4727V17.3088H82.4513V20.7507H73.248V17.3088H58.0588V11.4228L68.9579 0.698289H82.4509V11.4727H86.4917ZM73.2475 5.73615L67.4362 11.4727H73.2475V5.73615ZM57.9768 6.98335C57.9768 2.2195 53.7619 0 44.8825 0C35.3053 0 31.2645 2.5439 31.2645 8.62965H40.1686C40.1686 6.53478 41.6403 5.78655 44.5581 5.78655C47.4012 5.78655 48.2993 6.28552 48.2993 7.0585C48.2993 8.08119 47.9749 8.08119 40.8169 9.75223C32.8856 11.6226 30.4164 15.3143 30.4164 18.8808V20.7517H57.328V15.0893H41.5908C42.5384 14.1912 45.2321 13.942 51.1932 12.7946C55.1585 12.0464 57.9768 10.6746 57.9768 6.98335Z' fill='%23ffffff'/%3E%3C/svg%3E`,
    sternenko: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 200 200' fill='none'%3E%3Cpath d='M100 32.487L113.411 19.0797L100.295 0L86.5928 19.0797L100 32.487Z' fill='%23ffffff'/%3E%3Cpath d='M100 167.517L113.411 180.924L100.295 200L86.5928 180.924L100 167.517Z' fill='%23ffffff'/%3E%3Cpath d='M32.487 100L19.0759 86.5929L0 99.7088L19.0759 113.411L32.487 100Z' fill='%23ffffff'/%3E%3Cpath d='M167.517 100L180.924 86.5929L200 99.7088L180.924 113.411L167.517 100Z' fill='%23ffffff'/%3E%3Cpath d='M52.2607 52.2631V33.2969L29.499 29.0813L33.2983 52.2631H52.2607Z' fill='%23ffffff'/%3E%3Cpath d='M147.742 147.741H166.704L170.92 170.503L147.742 166.704V147.741Z' fill='%23ffffff'/%3E%3Cpath d='M52.26 147.741H33.2976L29.082 170.503L52.26 166.704V147.741Z' fill='%23ffffff'/%3E%3Cpath d='M147.742 52.2631V33.2969L170.503 29.0813L166.704 52.2631H147.742Z' fill='%23ffffff'/%3E%3Cpath d='M185.545 72.3834L127.617 14.4555L100 42.0723L72.3835 14.4555L14.4556 72.3834L42.0724 100L14.4556 127.617L72.3835 185.549L100 157.932L127.617 185.549L185.545 127.617L157.932 100L185.545 72.3834Z' fill='%23ffffff'/%3E%3Cpath d='M164.293 159.287C162.378 157.323 159.903 154.999 157.534 152.85C156.327 151.752 155.85 150.057 156.323 148.494C156.535 147.794 156.668 147.06 156.709 146.299C156.891 143.026 155.373 140.056 152.925 138.239C153.493 136.99 154.121 135.545 154.795 133.887C161.035 118.569 162.692 111.08 320.785 110.868C158.878 110.656 154.882 117.665 152.278 124.673C151.01 128.09 149.599 132.669 148.483 136.468C147.48 136.347 146.45 136.381 145.459 136.585C145.058 136.669 144.664 136.775 144.278 136.907H144.275C143.389 137.217 142.405 136.953 141.8 136.237C141.645 136.056 141.493 135.874 141.357 135.719C139.446 133.49 117.952 104.976 111.95 97.9605C111.057 96.9199 110.72 95.516 111.038 94.1802L110.505 84.8106L139.302 62.1056C141.289 63.6231 143.813 64.3194 146.318 64.0053C146.814 66.4234 147.54 69.5718 148.551 73.1251C150.855 81.2497 155.025 90.4603 157.436 89.6392C159.846 88.818 156.679 79.929 154.28 72.4175C153.024 68.4782 151.582 64.9248 150.496 62.4311C154.412 59.7859 155.862 54.5865 153.697 50.2385C153.625 50.0947 153.553 49.9585 153.474 49.8185C155.559 48.0778 158.439 45.5424 161.322 42.5794C166.824 36.9334 173.636 30.3982 171.85 28.5856C170.064 26.7729 162.215 33.1455 156.52 39.3818C154.026 42.1101 151.972 44.6039 150.447 46.5414C147.684 44.7023 144.044 44.3466 140.861 45.9321C139.098 46.8101 137.724 48.1572 136.816 49.7504C134.25 48.8573 130.599 47.6918 126.572 46.7382C118.902 44.918 109.793 42.4356 109.158 44.8991C108.522 47.3626 118.02 50.8213 126.3 52.5014C129.921 53.2356 133.115 53.7199 135.563 54.034C135.484 55.6196 135.798 57.2506 136.555 58.7718C136.562 58.7869 136.574 58.8021 136.581 58.821L110.111 77.825C107.462 73.1819 106.868 73.617 106.478 69.0155C106.089 64.414 108.019 60.4784 107.371 58.6166C107.318 58.4653 107.25 58.3253 107.171 58.1928C105.442 55.385 104.257 52.2744 104.159 48.9784C103.33 21.2746 99.9999 14.6826 99.9999 14.6826C99.9999 14.6826 96.6698 21.2746 95.8411 48.9784C95.7427 52.2744 94.5583 55.385 92.8289 58.1928C92.7495 58.3215 92.6813 58.4653 92.6284 58.6166C91.9813 60.4784 93.9074 64.4178 93.5214 69.0155C93.1317 73.617 92.5375 73.1781 89.8886 77.825L63.4184 58.821C63.4184 58.821 63.4374 58.7907 63.4449 58.7718C64.2018 57.2468 64.5159 55.6196 64.4364 54.034C66.8847 53.7237 70.0786 53.2393 73.7 52.5014C81.9797 50.8213 91.4742 47.3626 90.8422 44.8991C90.2103 42.4356 81.1018 44.918 73.4275 46.7382C69.405 47.6918 65.7495 48.8573 63.1838 49.7504C62.2756 48.161 60.902 46.8101 59.1386 45.9321C55.9561 44.3466 52.3157 44.7023 49.5533 46.5414C48.0283 44.6001 45.9697 42.1101 43.4797 39.3818C37.7846 33.1455 29.9362 26.7729 28.1501 28.5856C26.364 30.3982 33.1717 36.9334 38.6776 42.5794C41.5649 45.5386 44.4409 48.074 46.526 49.8185C46.4503 49.9547 46.3746 50.0947 46.3027 50.2385C44.1382 54.5827 45.5875 59.7822 49.5041 62.4311C48.418 64.921 46.9763 68.4744 45.7199 72.4175C43.3208 79.929 40.1534 88.8218 42.5639 89.6392C44.9745 90.4603 49.1446 81.2535 51.4492 73.1251C52.4557 69.5718 53.1823 66.4234 53.6818 64.0053C56.1869 64.3194 58.711 63.6231 60.6976 62.1056L89.4951 84.8106L88.9615 94.1802C89.2794 95.516 88.9388 96.9199 88.0495 97.9605C82.0479 104.976 60.5538 133.49 58.6428 135.719C58.5104 135.874 58.359 136.052 58.2001 136.237C57.5946 136.953 56.607 137.217 55.7252 136.907H55.7215C55.3355 136.771 54.9419 136.665 54.5408 136.582C53.5494 136.381 52.5201 136.343 51.5173 136.464C50.4047 132.665 48.9932 128.086 47.7218 124.669C45.1183 117.661 41.1222 110.653 39.215 110.865C37.3077 111.076 38.9652 118.569 45.2053 133.884C45.8789 135.541 46.507 136.983 47.0747 138.235C44.6263 140.052 43.1089 143.022 43.2905 146.296C43.3321 147.056 43.4646 147.79 43.6765 148.49C44.1495 150.053 43.6765 151.749 42.4656 152.846C40.0967 154.995 37.6218 157.319 35.7071 159.283C30.4887 164.637 25.8682 171.252 26.8786 172.883C27.889 174.514 33.9436 169.807 45.1107 157.603C45.5496 157.126 45.9621 156.664 46.3557 156.225C47.4152 155.033 49.0349 154.575 50.5901 154.927C51.4189 155.116 52.2892 155.192 53.1823 155.143C56.5767 154.954 59.4451 152.986 60.9398 150.193C62.2605 150.572 63.7779 150.98 65.5149 151.404C81.5824 155.336 89.234 155.877 89.1658 153.962C89.0977 152.044 81.5786 149.119 74.2638 147.571C70.6992 146.818 65.9614 146.091 62.041 145.546C62.041 145.452 62.041 145.353 62.0334 145.259C61.9502 143.768 61.5226 142.375 60.8339 141.161C60.3911 140.381 60.4971 139.412 61.0496 138.708C65.8744 132.601 81.9797 112.919 87.9511 106.698C88.7269 105.888 90.093 106.373 90.1914 107.489L90.8082 114.528C90.8082 114.528 91.7202 141.085 91.864 142.035C91.9018 142.277 92.9916 142.458 94.5886 142.58L100.004 137.164L105.419 142.58C107.02 142.462 108.106 142.281 108.143 142.035C108.291 141.081 109.199 114.528 109.199 114.528L109.816 107.489C109.914 106.373 111.28 105.892 112.056 106.698C118.028 112.919 134.133 132.601 138.958 138.708C139.514 139.408 139.616 140.381 139.174 141.161C138.481 142.379 138.053 143.768 137.974 145.259C137.97 145.357 137.966 145.452 137.966 145.546C134.046 146.091 129.308 146.818 125.744 147.571C118.429 149.119 110.91 152.048 110.842 153.962C110.773 155.881 118.425 155.336 134.493 151.404C136.229 150.98 137.751 150.572 139.068 150.193C140.562 152.986 143.434 154.954 146.825 155.143C147.718 155.192 148.589 155.116 149.417 154.927C150.973 154.575 152.592 155.033 153.652 156.225C154.045 156.668 154.458 157.126 154.897 157.603C166.06 169.807 172.118 174.514 173.129 172.883C174.139 171.252 169.519 164.637 164.3 159.283L164.293 159.287Z' fill='%231a3a52'/%3E%3C/svg%3E`
  };

  const foundations = [
    {
      name: "Повернись живим",
      url: "https://savelife.in.ua/",
      logoSrc: svgSources.saveLife
    },
    {
      name: "Фонд Сергія Притули",
      url: "https://prytulafoundation.org/",
      logoSrc: svgSources.prytula
    },
    {
      name: "United24",
      url: "https://u24.gov.ua/",
      logoSrc: svgSources.united24
    },
    {
      name: "Фонд Сергія Стерненка",
      url: "https://www.sternenkofund.org/",
      logoSrc: svgSources.sternenko
    }
  ];

  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });

useEffect(() => {
  const updateSize = () => {
    const vw = window.innerWidth;
    const size = Math.min(100, Math.max(50, Math.floor(vw * 0.12)));
    setLogoSize({ width: size, height: size });
  };
  
  updateSize();
  window.addEventListener('resize', updateSize);
  return () => window.removeEventListener('resize', updateSize);
}, []);


  // Add this constant at the top of the component (after svgSources):
const splashTexts = [
  "Кожна гривня наближає перемогу!",
  "Донат на ЗСУ - найкращий донат!",
  "Спочатку армія, потім розваги!",
  "Підтримай захисників!",
  "Твій донат = їхня перемога!",
  "Слава Україні!",
  "Все буде Україна!",
  "Донать на дрони!",
  "FPV для ворога!",
  "Добро переможе!",
];

// Add this state after logoSize:
const [splashText] = useState(() => 
  splashTexts[Math.floor(Math.random() * splashTexts.length)]
);

// Return (only showing changed Header section):
return (
  <div className="mb-8 relative">
    {/* Minecraft-style Splash Text */}
    <div 
      className="absolute right-4 sm:right-12 lg:right-20 top-8 sm:top-10 z-20 pointer-events-none hidden sm:block"
      style={{
        animation: 'splashPulse 1.5s ease-in-out infinite',
        transformOrigin: 'center center',
      }}
    >
      <span 
        className="text-[#ffd700] text-xs sm:text-sm minecraftFont inline-block whitespace-nowrap font-bold"
        style={{
          textShadow: '2px 2px 0px #3a2a00, -1px -1px 0px #3a2a00, 1px -1px 0px #3a2a00, -1px 1px 0px #3a2a00',
          transform: 'rotate(-12deg)',
        }}
      >
        {splashText}
      </span>
    </div>

    <BorderBox borderColor="bg-[#0057b8]" innerBg="bg-[#0a1628]">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-white minecraftFont flex items-center justify-center gap-2 text-center">
            <i className="hn hn-flag-ukraine text-xl sm:text-2xl"></i>
            <span>ПІДТРИМАЙ УКРАЇНУ</span>
            <i className="hn hn-flag-ukraine text-xl sm:text-2xl hidden sm:inline"></i>
          </h2>
          
          {/* Splash for mobile - below title */}
          <div 
            className="mt-2 sm:hidden"
            style={{
              animation: 'splashPulse 1.5s ease-in-out infinite',
            }}
          >
            <span 
              className="text-[#ffd700] text-[11px] minecraftFont inline-block whitespace-nowrap font-bold"
              style={{
                textShadow: '1px 1px 0px #3a2a00',
                transform: 'rotate(-3deg)',
                display: 'inline-block',
              }}
            >
              {splashText}
            </span>
          </div>
        </div>
        
        {/* Foundations Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {foundations.map((foundation) => (
            <a
              key={foundation.name}
              href={foundation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-200 hover:translate-y-[-2px] h-full"
            >
              <BorderBox 
                borderColor="bg-[#0057b8] group-hover:bg-[#ffd700]" 
                innerBg="bg-[#0a1628]"
                shine={true}
              >
                <div className="h-full flex flex-col group-hover:bg-[#0d1f3c] transition-colors">
                  {/* Logo Section */}
                  <div 
                    className="relative bg-[#0d2847] flex items-center justify-center"
                    style={{ height: 'clamp(80px, 20vw, 140px)' }}
                  >
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        backgroundColor: '#0d2847', 
                        overflow: 'hidden',
                        width: logoSize.width,
                        height: logoSize.height,
                      }}
                    >
                      <ImagePixelated 
                        src={foundation.logoSrc} 
                        width={logoSize.width} 
                        height={logoSize.height} 
                        pixelSize={2}
                        fillTransparencyColor="#0d2847"
                      />
                    </div>
                  </div>
                  
                  {/* Name Section */}
                  <div className="p-2 sm:p-3 flex flex-col flex-1 justify-center border-t border-[#0057b8]/30">
                    <h3 className="font-bold minecraftFont text-center text-[10px] sm:text-xs text-white leading-tight line-clamp-2">
                      {foundation.name}
                    </h3>
                  </div>
                </div>
              </BorderBox>
            </a>
          ))}
        </div>

        {/* Divider */}
          <div className="my-4 sm:my-5 flex items-center gap-2">
          {/* Blue gradient - left side */}
          <div className="flex-1 flex h-[6px]">
            <div className="flex-1 bg-[#001433]"></div>
            <div className="flex-1 bg-[#002d66]"></div>
            <div className="flex-1 bg-[#0044aa]"></div>
            <div className="flex-1 bg-[#0057cc]"></div>
            <div className="flex-1 bg-[#0066ff]"></div>
            <div className="flex-1 bg-[#3388ff]"></div>
          </div>
                
          <i className="hn hn-heart-solid text-[#ffd700] text-base drop-shadow-[2px_2px_0px_#805500]"></i>
                
          {/* Yellow gradient - right side */}
          <div className="flex-1 flex h-[6px]">
            <div className="flex-1 bg-[#ffee55]"></div>
            <div className="flex-1 bg-[#ffdd00]"></div>
            <div className="flex-1 bg-[#eebb00]"></div>
            <div className="flex-1 bg-[#cc9900]"></div>
            <div className="flex-1 bg-[#997722]"></div>
            <div className="flex-1 bg-[#664400]"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-white/90 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            <span className="text-[#ffd700] font-bold">Перш ніж донатити на розваги</span>
            <span className="text-white/70">, згадай завдяки кому ти можеш і далі грати. </span>
            <span className="text-white">Підтримай наших захисників та допоможи Україні перемогти!</span>
          </p>
        </div>
      </div>
    </BorderBox>
    
    <style>{`
      @keyframes splashPulse {
        0%, 100% {
          transform: scale(1) rotate(-12deg);
        }
        50% {
          transform: scale(1.15) rotate(-12deg);
        }
      }
    `}</style>
  </div>
);
};