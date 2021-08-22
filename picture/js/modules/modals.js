const modals = () => {
    let btnPressed = false; //ни одна кнопка не нажата

    function bindModals (triggerSelector, modalSelector, closeSelector, destloy=false){
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();
        
        trigger.forEach (item =>{
            item.addEventListener('click', (e) =>{
                if(e.target){
                    e.preventDefault();
                }

                btnPressed = true; //как только будет нажат триггер - переменная let изм.

                if(destloy){ //если равен true, то удаляем этот эл
                    item.remove();
                }

                windows.forEach(item =>{
                    item.style.display = 'none'; //при нажатии на триггера для откр мод окна, все ост. мод окна закр
                    item.classList.add('animated', 'fadeIn'); //плавное открытие окон
                }); 
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; //отмена скроллинга при откр мод окна
                document.body.style.marginRight = `${scroll}px`; //добавится отступ 
                
    
            });
        });
        

        close.addEventListener('click', () =>{

            windows.forEach(item =>{
                item.style.display = 'none';
            }); //при нажатии на Х все остальные мод окна закрываются
            
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`; //при закр мод окна исчезнет отступ
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal){ 
                windows.forEach(item =>{
                    item.style.display = 'none';
                }); //при нажатии на подложку все остальные мод окна закрываются

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`; //при закр мод окна исчезнет отступ
            
            }
        });
        
    }

    function showModalbyTime(selector, time){
        setTimeout(()=>{
            let display;

            document.querySelectorAll('[data-modal]').forEach(item =>{ //получаем доступ по всем мод окнам
                if(getComputedStyle(item).display !== 'none') { //если перебираемое мод окно открыто
                    display = 'block';
                } 
            });

            if(!display){ //если ни одно мод окно не открыто, то всплывает нужное мод окно через время
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden'; 
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`; //добавится отступ 
            }

        }, time);
    }

    //функция, ктр будет подсчитывать расстояние скролла в px
    function calcScroll() {
        let div = document.createElement('div'); //будет производиь расчеты

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden'; //скроет div

        document.body.appendChild(div); //помещаем на стр

        let scrollWidth = div.offsetWidth - div.clientWidth; 
        //полная ширина скролла -  контент скролла без самого скролла = сам скролл

        div.remove(); //как вычислили удаляем div

        return scrollWidth; //возвращаем полученное значение 

    }

    //фун-ия, ктр отслеживает когда пользователь долистал до конца стр и но не нажал ни одну кнопку-появляется мод окно (popup-gift)
    
    function openByScroll(selector){
        window.addEventListener('scroll', () =>{
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); 
            //этот код испол.для старых браузеров. Библиот.Math вернет max знач. ктр указано в арг

            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){ 
                document.querySelector(selector).click();
            } 
        });
    }

    bindModals('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    
    // showModalbyTime('.popup-consultation', 5000);
};

export default modals;