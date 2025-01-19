// Переключение слайдов через клики на es-cross__circle
const circles = document.querySelectorAll('.es-cross__circle');

circles.forEach((circle, index) => {
  circle.addEventListener('click', () => {
    // Установить активный слайд
    swiper.slideTo(index);

    // Изменить opacity активного элемента
    circles.forEach((item) => (item.style.opacity = '0.5'));
    circle.style.opacity = '1';
    circle.style.transition = 'opacity 0.5s';

    // Обновить текст в блоке #info
    const infoElement = document.getElementById('info');
    infoElement.textContent = circle.getAttribute('data-info');
  });
});
