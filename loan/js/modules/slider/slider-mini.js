import Slider from './slider';

export default class MiniSlider extends Slider{
    constructor(container, next, prev, activeClass, animate, autoplay){
        super(container, next, prev, activeClass, animate, autoplay);                   //получаем св-ва этих объектов от родителя  

    }

    decorizeSlides(){
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);                                   //все слайды становятся неактивными 
            if(this.animate){                                                           //если в параметрах прописано animate
                slide.querySelector('.card__title').style.opacity = '0.4';              //то у неактивного слайдера заголовок также неактивен   
                slide.querySelector('.card__controls-arrow').style.opacity = '0';       //тоже самое с селектором стрелки 
            } 
        });

        if (!this.slides[0].closest('button')) {                                     //если не явл. кн., то   
            this.slides[0].classList.add(this.activeClass);                         //доб. первому слайду класс
        }
                                    
        if(this.animate){                                                               //если в параметрах прописано animate = true
            this.slides[0].querySelector('.card__title').style.opacity = '1';           //то у 1-го слайда селектор заголовка становится видимим    
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';  //тоже самое с селектором стрелки 
        } 
    }

    nextSlide() {      
        if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON'){   //если 2-ая и 3-ая слайды явл. кнопками  
            this.container.appendChild(this.slides[0]);                                 //то 1-ый слайд уходит в конец слайдера
            this.container.appendChild(this.slides[1]);                                 //2-ый btn    
            this.container.appendChild(this.slides[2]);                                 //3-ый btn также уходят сразу в конец
            this.decorizeSlides();
        }else if(this.slides[1].tagName == 'BUTTON'){
            this.container.appendChild(this.slides[0]);                                 
            this.container.appendChild(this.slides[1]);    
            this.decorizeSlides();                           
        }else{
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }

    }

    bintTriggers(){
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () =>{
            for (let i = this.slides.length - 1; i > 0; i--) {                 //запускаем цикл
                if (this.slides[i].tagName !== 'BUTTON') {                     //если посл.слайд не будет кн. 
                    let active = this.slides[i];                               
                    this.container.insertBefore(active, this.slides[0]);       //то последний слайд становится первым
                    this.decorizeSlides();  
                    break;                  
                }
            }

        });
    }

    activateAnimation() {
        let paused = setInterval(() => this.nextSlide(), 5000); //запускается nextSlide() каждые 5 сек.

        this.container.addEventListener('mouseenter', () => {   //мышка над слайдом, то автопереключение ост.
            clearInterval(paused);
        });

        this.container.addEventListener('mouseleave', () => {     //мышку убрали,  setInterval запускается 
            this.activateAnimation();
        });
    }

    init(){
        try {
            this.container.style.cssText =                  //стилизуем контейнер со слайдами
            `                
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
    
            this.bintTriggers();
            this.decorizeSlides();
            
            if (this.autoplay) {                                //если указан этот параметр, то запускается setInterval
              this.activateAnimation();
            }
              
        } catch (error) {}
            
    }
}