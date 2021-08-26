import Slider from './slider';

export default class MainSlider extends Slider{       
    constructor(btns){
        super(btns);                                       
        this.prevModule = document.querySelectorAll('.prevmodule');
        this.nextModule = document.querySelectorAll('.nextmodule');  
    }

    showSlides(n) {                                 //n = тек. нумерация слайда
       try {
            if(n > this.slides.length){                 //если тек. индекс больше  кол-во слайдов, 
                this.slideIndex = 1;                    //то возврат к 1-му слайду
            }    
       } catch (error) {}

        if(n < 1){                                    
            this.slideIndex = this.slides.length;    //если меньше 1, то показ посл.слайд
        }

        try{
         
          this.hanson.style.opacity ='0';                   //скрываем блок (становится прозрачным    

          if(n ===3){                                       //если на стр.3, то через 3 сек. появляется блок
                this.hanson.classList.add('animatad');  
                setTimeout(() => {
                    this.hanson.style.opacity  ='1';
                    this.hanson.classList.add('slideInUp');                  
                }, 3000);
            }else{
                this.hanson.classList.remove('slideInUp');
             }
        }catch(e){}
        

        try {
            this.slides.forEach(slide => {
                slide.classList.add('animated');         //для плавного скрытия
                slide.style.display = 'none';
            });   
        } catch (error) {}           
        

        
       try {
        this.slides[this.slideIndex - 1].style.display = 'block';  //-1, т.к. в js 0=1, т.е показываем тек. слайд
       } catch (error) {} 
    }

    toggleButtons(btnsmodule, n){
        btnsmodule.forEach(btn =>{
            btn.addEventListener('click', (e) =>{
                e.stopPropagation();   //отмена всплытия
                e.preventDefault();
                this.plusSlides(n);
            });
        });
    }

    
    plusSlides (n){                                 //переключение слайдов,  n - будем передавать 1 или -1(вперед или назад)
        this.showSlides(this.slideIndex += n);
    }


    render(){                                     //главный метод, ктр будет выполнять главное действие на стр
       if (this.container) {
            try{
                this.hanson = document.querySelector('.hanson');  //получаем доступ к блоку, ктр необходимо будет вызвать 
            }catch(e){}
        
            this.btns.forEach(btn =>{
                btn.addEventListener('click', ()=>{
                    this.plusSlides(1);
                    this.slides[this.slideIndex - 1].classList.add('slideInLeft');
                });
    
                //при клике на логотип - идет переход к первому слайду:
                btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{   //при клике на родителя предыдущего эл.
                    e.preventDefault();     //отменяем действие ссылки
    
                    this.slideIndex = 1;  
                    this.showSlides(this.slideIndex); //показ текущего слайда
                });
            });
    
            this.showSlides(this.slideIndex); //показ текущего слайда  

            this.toggleButtons(this.prevModule, -1);
            this.toggleButtons(this.nextModule, 1);

        } 



    }

}