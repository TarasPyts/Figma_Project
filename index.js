const menu = document.getElementById('menu');

function openmenu() {
  document.getElementById('menu').style.left = '0';
}

function closemenu() {
  document.getElementById('menu').style.left = '-100%';
}

const btn1 = document.getElementById('myButton1');
const btn2 = document.getElementById('myButton2');
const btn3 = document.getElementById('myButton3');

btn1.addEventListener('click', hideContent);
btn2.addEventListener('click', hideContent);
btn3.addEventListener('click', hideContent);

function hideContent() {
  const container = document.querySelectorAll('.container');
  const container2 = document.querySelectorAll('.container2');
  const headerImg = document.querySelector('.image10');
  const headerHeading = document.querySelector('.text11');

  container.forEach((c) => (c.style.display = 'none'));
  container2.forEach((c) => (c.style.display = 'block'));
  headerImg.style.display = 'block';
  headerHeading.style.display = 'block';
}

const line = document.querySelector('.line');
const allLi = document.querySelectorAll('li');
const clickedLiTexts = [];
const menuIds = [
  'menu1',
  'menu2',
  'menu3',
  'menu4',
  'menu5',
  'menu6',
  'menu7',
  'menu8',
  'menu9',
  'menu10',
  'menu11',
  'menu12',
  'menu13',
  'menu14',
];
let currentMenuIndex = 0;

allLi.forEach((li) => {
  li.addEventListener('click', () => {
    const currentMenu = document.getElementById(menuIds[currentMenuIndex]);
    currentMenu.style.display = 'none';
    currentMenuIndex++;
    const nextMenu = document.getElementById(menuIds[currentMenuIndex]);
    nextMenu.style.display = 'block';

    clickedLiTexts.push(li.textContent);
    console.log(li.textContent);
    console.log(clickedLiTexts);
    console.log(currentMenuIndex);

    // Update the width of the line
    const containerWidth = line.parentElement.offsetWidth;
    const currentWidth = line.offsetWidth;
    const fillWidth = Math.min(containerWidth, currentWidth + 19); // Increase width by 20px
    line.style.width = fillWidth + 'px';
  });
});
