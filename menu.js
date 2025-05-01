document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const mainMenu = document.getElementById('main-menu');
  const serversToggle = document.getElementById('servers-toggle');
  const serversSubmenu = document.getElementById('servers-submenu');

  // Бургер
  burger.addEventListener('click', () => {
    mainMenu.classList.toggle('hidden');
  });

  // Сервери
serversToggle.addEventListener('click', (e) => {
  e.preventDefault();
  if (serversSubmenu.classList.contains('max-h-0')) {
    serversSubmenu.classList.remove('max-h-0');
    serversSubmenu.classList.add('max-h-[500px]');
    
    if (window.innerWidth >= 768) {
      serversSubmenu.classList.add('absolute', 'translate-y-4', 'left-0');
    }
  } else {
    serversSubmenu.classList.remove('max-h-[500px]');
    serversSubmenu.classList.add('max-h-0');

    if (window.innerWidth >= 768) {
      serversSubmenu.classList.remove('absolute', 'translate-y-4', 'left-0');
    }
  }
});

// При ресайзі
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    mainMenu.classList.remove('hidden');
    serversSubmenu.classList.remove('max-h-0');
    serversSubmenu.classList.add('max-h-[500px]');
    
    // 🛠 Додати абсолют для ПК
    serversSubmenu.classList.add('absolute', 'translate-y-10', 'left-0');
  } else {
    mainMenu.classList.add('hidden');
    serversSubmenu.classList.remove('max-h-[500px]');
    serversSubmenu.classList.add('max-h-0');
    
    // 🛠 Приховати абсолют на телефоні
    serversSubmenu.classList.remove('absolute', 'translate-y-10', 'left-0');
  }
});


  // Підсвітка активного посилання
  const links = document.querySelectorAll('.menu-link');
  links.forEach(link => {
    if (link.tagName === 'A') {
      const hrefNormalized = link.href.replace(/\/$/, '');
      const locationNormalized = window.location.href.replace(/\/$/, '');
      if (hrefNormalized === locationNormalized) {
        link.classList.add('bg-[#c5629a]', 'pointer-events-none');
      }
    }
  });
});
