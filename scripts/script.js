const circles = document.querySelectorAll('.es-cross__circle');
const infoElement = document.getElementById('info');

document
  .querySelector('.es-ingredients__expand')
  .addEventListener('click', function () {
    document.querySelector('.es-ingredients__list').classList.toggle('open');
  });

const swiper = new Swiper('.swiper1', {
  loop: false,
  autoHeight: true,
  initialSlide: 0,
  pagination: {
    el: '.swiper1-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper1-button-next',
    prevEl: '.swiper1-button-prev',
  },
});

let currentIndex = 0;

function updateActiveCircle(index) {
  circles.forEach((item, i) => {
    item.style.opacity = '0.5';
    item.classList.remove('active');
    const line = item.nextElementSibling;
    if (line) line.style.opacity = '0';
  });

  const circle = circles[index];
  circle.style.opacity = '1';
  circle.classList.add('active');

  const currentLine = circle.nextElementSibling;
  if (currentLine) currentLine.style.opacity = '1';

  infoElement.textContent = circle.getAttribute('data-info');

  let offsetLeft = 0;
  if (index !== 0) {
    const circleRect = circle.getBoundingClientRect();
    const containerRect = circle
      .closest('.es-cross__numbers')
      .getBoundingClientRect();
    offsetLeft = circleRect.left - containerRect.left + circleRect.width / 2;

    if (index === 3 || index === 4) {
      offsetLeft -= 40;
    }

    const maxOffset = containerRect.width - infoElement.offsetWidth;
    if (offsetLeft > maxOffset) offsetLeft = maxOffset;
    if (offsetLeft < 0) offsetLeft = 0;
  }

  infoElement.style.left = index === 0 ? '25px' : `${offsetLeft - 50}px`;

  currentIndex = index;
}

function initializeFirstSlide() {
  updateActiveCircle(0);
}

circles.forEach((circle, index) => {
  circle.addEventListener('click', () => {
    if (currentIndex === index) return;
    swiper.slideTo(index);
    updateActiveCircle(index);
  });
});

swiper.on('slideChange', () => {
  const activeIndex = swiper.activeIndex;
  updateActiveCircle(activeIndex);
});

initializeFirstSlide();
