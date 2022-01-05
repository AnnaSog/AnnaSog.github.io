const board = document.querySelector('#board');
const btn = document.querySelector('.clear');

const squareNumber = 500;
const colors = ['#D8BFD8', '#DDA0DD	', '#EE82EE', '#DA70D6','#FF00FF', '#FF00FF','#BA55D3', '#9370DB', '#8A2BE2', '	#FF7F50', '#FF4500', '#FFD70', '#800080', '#4B0082'];

for (let i = 0; i < squareNumber; i++) {  //цикл остановится когда i будет 500

    const square = document.createElement('div');  //создаем новыe 500 div
    square.classList.add('square');                //присваиваем класс, эти div будут квадратами
    board.append(square);                          //добавляем в html

    square.addEventListener('mouseover', (e) => {
        const elem = e.target;
        const color = getRandomColor();
        elem.style.backgroundColor = color;
        elem.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    });

    btn.addEventListener('click', () => {
        square.style.backgroundColor = '#1d1d1d';
        square.style.boxShadow = '0 0 2px #000';
    });
}

function getRandomColor(){
    return colors[Math.round(Math.random() * colors.length)];
}

