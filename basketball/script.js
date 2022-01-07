const items = document.querySelectorAll('.item');       
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const placeholder = document.querySelector('.placeholder');

let time = 0;



items.forEach(item => {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
});


function dragstart(event){
    event.target.classList.add('hold');                     //когда начинаем перетаскивать border меняет цвет
    setTimeout(() => event.target.classList.add('hide'), 0);  //во время перетаскивания исходный эл. через 4 сек. исчезает
}

function dragend(event){
    event.target.classList.add('hold', 'hide');  //как закончили перескивания и отпустили эл.удаляется
}

placeholder.addEventListener('dragover', dragover);   //находится над местом перетаскивания
placeholder.addEventListener('dragenter', dragenter); //находится на территоррии места
placeholder.addEventListener('dragleave', dragleave);   //покунилу место
placeholder.addEventListener('drop', dragdrop);         //отпустил эл в перетаскиваемое место    


function dragover(event){
    event.preventDefault();
}

//находится на территории места
function dragenter(event){
    event.target.classList.add('hovered');  //подсветичвает место куда надо скинуть 
}

//покунили место и не скинули
function dragleave(event){
    event.target.classList.remove('hovered');  //удаляется подсвечивание места 
}

//перетащили и отпустили
function dragdrop(event){
    event.target.classList.remove('hovered');   //после того как скинули border перестает подсветиваться
}



timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));  //parseInt - 1-ый арг ктр указан преобразуется в числовое значение
        startGame();
    }
});

function startGame(){
    setInterval(decreaseTime, 1000);
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
    // timeEl.parentNode.classList ="hide";     //удаляем время и его родителя строку "Осталось"
}
