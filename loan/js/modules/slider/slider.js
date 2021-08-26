export default class Slider {
    constructor({
        container =null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = "",
        animate = false,
        autoplay = false }                                 
        = {}){
        this.container = document.querySelector(container);            //this -обр. к экз. нового созданного объекта
        try {this.slides = this.container.children;} catch (error) {}                 //получаем всех детей контейнера
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.btns = document.querySelectorAll(btns);
        this.activeClass = activeClass;                         //активный(дествующий) слайд
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;                            //нумерация слайда, по умолчанию показывается первый
    }

}
