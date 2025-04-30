let currentIndex = 0;
let teamData = [];
let autoSlideInterval;
let isPaused = false;
let progress = 0;
let progressBar;

async function loadTeam() {
    const response = await fetch('team.json');
    teamData = await response.json();

    preloadImages();
    renderNavigation();
    renderProgressBar(); // тут створимо прогрес-бар окремо
    renderSlide(currentIndex);
    startAutoSlide();
}

function preloadImages() {
    teamData.forEach(member => {
        const avatar = new Image();
        avatar.src = `https://www.mc-heads.net/avatar/${member.username}.png`;

        const roleIcon = new Image();
        roleIcon.src = `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/${member['role-icon']}.png`;
        
        const bustImage = new Image();
        bustImage.src = `https://nmsr.nickac.dev/bust/${member.username}`;
    });
}


function renderProgressBar() {
    const navigation = document.getElementById('progress-bar-wrapper');
    const progressBarWrapper = document.createElement('div');
    progressBarWrapper.className = "w-full h-2 bg-gray-700 mt-2";

    const progressDiv = document.createElement('div');
    progressDiv.id = 'progress-bar';
    progressDiv.className = 'h-full bg-[#c5629a] transition-all';
    progressDiv.style.width = '0%';

    progressBarWrapper.appendChild(progressDiv);
    navigation.appendChild(progressBarWrapper);

    progressBar = document.getElementById('progress-bar');
}

function renderSlide(index) {
    const slider = document.getElementById('slider');
    const skeleton = document.getElementById('slider-skeleton');
    if (skeleton) skeleton.remove();

    const member = teamData[index];

    slider.innerHTML = `
    <div id="slider-content" class="relative grid grid-cols-1 md:grid-cols-[2fr,1fr] items-center gap-8 w-full max-w-[100vw] overflow-hidden">
      
      <div class="flex flex-col h-full justify-start md:ml-20">
        <h2 class="text-2xl font-bold text-white">Познайомтеся з командою</h2>
        <p class="mt-2 mb-10">Дізнайтеся про людей, які роблять сервер дивовожним!</p>

        <div class="slide-text opacity-0 transition duration-500">
          <h3 class="minecraftFont text-3xl font-semibold text-white leading-relaxed flex flex-wrap items-center gap-2">
            <span class="break-words">${member.name}</span>
            <span class="cornerCutSmall ${member['role-color']} px-2 flex flex-wrap items-center gap-2">
              <i class="role-icon pixelated inline-block" style="
                background-image: url('https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/${member['role-icon']}.png');
                background-size: cover;
                width: 32px;
                height: 32px;
                display: inline-block;
                image-rendering: pixelated;
                flex-shrink: 0;"></i>
              <span class="break-words">${member.role}</span>
            </span>
          </h3>

          <div class="flex flex-grow items-center justify-center mt-8">
            <p class="text-white leading-relaxed text-center max-w-lg">${member.description}</p>
          </div>
        </div>
      </div>

      <div class="relative flex justify-center items-center min-h-[250px]">
        <div class="image-wrapper w-full max-w-[300px] aspect-[3/4] overflow-hidden relative">
          <img 
            src="/def.png"
            data-src="https://nmsr.nickac.dev/bust/${member.username}"
            class="slide-image absolute inset-0 w-full h-full object-contain opacity-0 translate-x-10 transition duration-500"
            alt="${member.name}">
        </div>
      </div>
    </div>
    `;

    const slideImg = slider.querySelector('.slide-image');
    const realSrc = slideImg.dataset.src;
    const preImg = new Image();

    preImg.onload = () => {
        slideImg.src = realSrc;
        requestAnimationFrame(() => {
            slideImg.classList.remove('opacity-0', 'translate-x-10');
            setTimeout(() => {
                const slideText = slider.querySelector('.slide-text');
                slideText.classList.remove('opacity-0');
            }, 100);
        });
    };

    preImg.src = realSrc;

    const sliderContent = document.getElementById('team');
    sliderContent.addEventListener('mouseenter', () => isPaused = true);
    sliderContent.addEventListener('mouseleave', () => isPaused = false);
}



function renderNavigation() {
    const navigation = document.getElementById('navigation');
    navigation.innerHTML = '';

    const navWrapper = document.createElement('div');
    navWrapper.className = "relative flex items-center justify-center gap-4";

    const prevButton = document.createElement('button');
    prevButton.id = 'prev-btn';
    prevButton.className = 'bg-no-repeat bg-center bg-contain bg-[url("/icons/left.svg")] text-white filter invert-[1] font-bold p-2 rounded-full w-10 h-10 flex-shrink-0';
    prevButton.onclick = () => {
        prevSlide();
        resetAutoSlide();
    };
    navWrapper.appendChild(prevButton);

    const scrollContainer = document.createElement('div');
    scrollContainer.id = 'scroll-container';
    scrollContainer.className = "flex flex-wrap items-center gap-4 overflow-x-auto overflow-y-hidden no-scrollbar";
    scrollContainer.style.maxWidth = 'calc(100% - 80px)';

    teamData.forEach((member, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative w-12 h-12 flex-shrink-0';

        const button = document.createElement('button');
        button.className = 'w-full h-full relative';
        button.onclick = () => {
            currentIndex = index;
            renderSlide(currentIndex);
            highlightActiveButton();
            resetAutoSlide();
        };

        const img = document.createElement('img');
        img.src = `https://www.mc-heads.net/avatar/${member.username}.png`;
        img.className = 'transition w-full h-full object-cover';

        button.appendChild(img);
        wrapper.appendChild(button);
        scrollContainer.appendChild(wrapper);
    });

    const nextButton = document.createElement('button');
    nextButton.id = 'next-btn';
    nextButton.className = 'bg-no-repeat bg-center bg-contain bg-[url("/icons/right.svg")] text-white filter invert-[1] font-bold p-2 rounded-full w-10 h-10 flex-shrink-0';
    nextButton.onclick = () => {
        nextSlide();
        resetAutoSlide();
    };
    navWrapper.appendChild(scrollContainer);
    navWrapper.appendChild(nextButton);

    navigation.appendChild(navWrapper);

    highlightActiveButton();
}


function highlightActiveButton() {
    let scrollContainer = document.getElementById('scroll-container');
    
    if (!scrollContainer) {
        renderNavigation(); // якщо немає — генеруємо наново
        scrollContainer = document.getElementById('scroll-container'); // і ще раз знаходимо!
    }

    const allWrappers = scrollContainer.querySelectorAll('div');

    allWrappers.forEach((wrapper, idx) => {
        const img = wrapper.querySelector('img');
        if (!img) return; // безпечна перевірка
        img.classList.remove('absolute', '-translate-y-8');
        img.classList.add('relative');

        if (idx === currentIndex) {
            img.classList.remove('relative');
            img.classList.add('absolute', 'transform', '-translate-y-8');
        }
    });

    const activeWrapper = allWrappers[currentIndex];
    if (activeWrapper) {
        const offsetLeft = activeWrapper.offsetLeft;
        const offsetWidth = activeWrapper.offsetWidth;
        const containerWidth = scrollContainer.clientWidth;
        const scrollPosition = offsetLeft - (containerWidth / 2) + (offsetWidth / 2);

        scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}








function startAutoSlide() {
    progress = 0;
    autoSlideInterval = setInterval(() => {
        if (!isPaused) {
            progress += 100 / (10000 / 100); // 100% за 5 секунд
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            }

            if (progress >= 100) {
                nextSlide();
            }
        }
    }, 100);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % teamData.length;
    renderSlide(currentIndex);
    highlightActiveButton();
    resetAutoSlide();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + teamData.length) % teamData.length;
    renderSlide(currentIndex);
    highlightActiveButton();
    resetAutoSlide();
}

// Initial load
loadTeam();
