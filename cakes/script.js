const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');

const sidebar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const slidesCount = mainSlide.querySelectorAll('div').length; //узнаем кол-во div
const container = document.querySelector('.container');

let activeSlideIndex = 0;  //активный слайд

//sidebar подгоняем под размер слайда
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

//настраиваем фун-л кнопок 
function changeSlide(btn){
    if(btn === 'up'){
        activeSlideIndex++;

        if(activeSlideIndex === slidesCount){  //если кол-во нумерация слайдов равно кол-ву самих слайдов
            activeSlideIndex = 0;               //то возращается к 1-му слайду
        }
    } else if(btn === 'down'){
        activeSlideIndex--;

        if(activeSlideIndex < 0){  //если кол-во нумераций слайдов меньше 0
            activeSlideIndex = slidesCount-1;               
        }
    }

    
    const height = container.clientHeight;  //получаем высоту контейнера
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;  //вычисляем высоту слайда 
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;  //вычисляем высоту sidebar 
}

upBtn.addEventListener('click', () => {
    changeSlide('up');
});

downBtn.addEventListener('click', () => {
    changeSlide('down');
});

//настройка работы слайдера с помощью клавиатуры (без мышки)
document.addEventListener('keydown', (e)=> {
    if(e.key === 'ArrowUp'){
        changeSlide('up');
    }else if(e.key === 'ArrowDown'){
        changeSlide('down');
    }
});