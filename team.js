//team.js

let currentIndex = 0;
let teamData = [];

async function loadTeam() {
    const response = await fetch('team.json');
    teamData = await response.json();

    renderNavigation();
    renderSlide(currentIndex);
}

function renderNavigation() {
    const navigation = document.getElementById('navigation');
    navigation.innerHTML = '';

    teamData.forEach((member, index) => {
        const avatarUrl = `https://www.mc-heads.net/avatar/${member.username}.png`;
        const button = document.createElement('button');
        button.innerHTML = `<img src="${avatarUrl}" class="w-12 h-12 transition">`;
        button.onclick = () => {
            currentIndex = index;
            renderSlide(currentIndex);
            highlightActiveButton();
        };
        navigation.appendChild(button);
    });

    highlightActiveButton();
}

function renderSlide(index) {
    const slider = document.getElementById('slider');
    const member = teamData[index];

    slider.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-[2fr,1fr] items-center gap-8 w-full max-w-[100vw] overflow-hidden">
            <div class="slide-text opacity-0 transition duration-500 md:ml-20">
                <h3 class="minecraftFont text-4xl font-semibold text-white leading-relaxed flex flex-wrap items-center gap-2">
                    <span class="break-words">${member.name}</span>
                    <span class="cornerCutSmall ${member['role-color']} px-2 flex flex-wrap items-center gap-2">
                        <i class="role-icon pixelated inline-block" style="
                            background-image: url('https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/${member['role-icon']}.png'); 
                            background-size: cover; 
                            width: 32px; 
                            height: 32px; 
                            display: inline-block; 
                            image-rendering: pixelated;
                            flex-shrink-0;
                        "></i>
                        <span class="break-words">${member.role}</span>
                    </span>
                </h3>
                <p class="mt-2 leading-relaxed text-white">${member.description}</p>
            </div>
            <img 
                src="https://nmsr.nickac.dev/bust/${member.username}"
                class="slide-image w-full md:w-auto h-45 justify-self-center opacity-0 translate-x-10 transition duration-500" 
                alt="${member.name}">
        </div>
    `;

    setTimeout(() => {
        slider.querySelector('.slide-image').classList.remove('opacity-0', 'translate-x-10');
        slider.querySelector('.slide-text').classList.remove('opacity-0');
    }, 50);
}




function highlightActiveButton() {
    document.querySelectorAll('#navigation button').forEach((btn, idx) => {
        btn.classList.toggle('transform', idx === currentIndex);
        btn.classList.toggle('-translate-y-2', idx === currentIndex);
    });
}

// Initial load
loadTeam();