const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#FF0000', '#FFD700', '#00FF00', '#00FFFF','#008B8B', '#0000FF','#483D8B', '#FF00FF', '#4B0082', '#C71585', '#D2B48C', '#D2691E', '#800000', '#4B0082'];

let time = 0;
let score = 0; //счет игры

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');    //к первому блоку добавляем класс up, ктр прокручивает стр, т.е. видим 1-ую стр.
});

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));  //parseInt - 1-ый арг ктр указан преобразуется в числовое значение
        screens[1].classList.add('up');         //видим 2-ую стр, где сама игра
        startGame();
    }
});

// startGame();

function startGame(){
    screens[1].classList.add('up');         //видим 2-ую стр, где сама игра
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime(){
    if(time === 0){
        finishGame();
    }else {
        let current = --time;   //текущее время уменьшаем через 1 сек
        if(current < 10){
            current = `0${current}`; 
        }
        setTime(current);     //таймер идет
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`;     //таймер идет
}

function finishGame(){
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span> </h1>`;
    timeEl.parentNode.classList ="hide";     //удаляем время и его родителя строку "Осталось"
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();  //возвращает объект, который содержит размеры элемента и его положение относительно видимой области
    const x = getRandomNumber(0, width - size);  //получим размер доски
    const y = getRandomNumber(0, height - size);  //получим размер доски

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = getRandomColor();

    board.append(circle);       //доб. на доску
}

//создаем рандомно размер 
function getRandomNumber(min, max){
    return Math.round(Math.random() * (max-min) + min);
}

function getRandomColor(){
    return colors[Math.round(Math.random() * colors.length)];
}

//назначаем обрабочик событий на доску
board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){      //если кликнувший эл содержит класс circle
        score++;                                        //то счет увеличивается
        event.target.remove();                  //сам эл. удаляется
        createRandomCircle();                   //и рандомно появляется заново
    }
});


