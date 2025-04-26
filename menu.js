//menu.js
const burger = document.getElementById('burger');
const mainMenu = document.getElementById('main-menu');

// Клік по бургеру
burger.addEventListener('click', () => {
  mainMenu.classList.toggle('hidden');
});

// При зміні ширини вікна автоматично приховуємо меню
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    mainMenu.classList.remove('hidden');
  } else {
    mainMenu.classList.add('hidden');
  }
});

// Підсвітити активне посилання
const links = document.querySelectorAll('.menu-link');
links.forEach(link => {
  const hrefNormalized = link.href.replace(/\/$/, '');
  const locationNormalized = window.location.href.replace(/\/$/, '');
  if (hrefNormalized === locationNormalized) {
    link.classList.add('bg-indigo-400', 'pointer-events-none');
  }
});
