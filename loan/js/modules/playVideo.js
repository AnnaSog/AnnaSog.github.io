export default class VideoPlayer{
    constructor(triggers, modal){
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(modal);                   //модалка с видео 
        this.close = this.overlay.querySelector('.close');
    
    }

    bindTriggers(){
        this.btns.forEach((btn, i) =>{                                                  //i - номер 
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;  //получаем блок родителя сл. эл.

                if (i % 2 == 0){                                 //i % 2 определение четности/нечетности, 0 - четность
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch (error) {}
                
            btn.addEventListener('click', ()=>{
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true'){

                    this.activeBnt = btn;                                         //получаем доступ к кн., ктр кликнули, чтобы отследить какая за ней

                    if(document.querySelector('iframe#frame')){              //если плеер уже создан (если не прописать это усл., то плеер будет созд. каждый раз при наж.btn)
                        this.overlay.style.display = 'flex';                 //то показываем мод окно с ним    
                        if(this.path !==  btn.getAttribute('data-url')){     //если путь видео не равен этому аттрибуту,
                            this.path = btn.getAttribute('data-url');         //то создается этот путь
                            this.player.loadVideoById({videoId:this.path});      //и загружается видео из youtube по этой ссылке
                        } 
                    }else{                                                  //если нет, то создаем     
                        this.path = btn.getAttribute('data-url');         //data-url указана ссылка на видео
                        this.createPlayer(this.path);                           //при нажатии на кнопку создается плеер с ссылкой на видео  
                    }
    
                }

            });
        });
    }

    bindCloseBtn(){
        this.close.addEventListener('click', () =>{
            this.overlay.style.display = 'none';  
            this.player.stopVideo();                        //в плеере завершаем видео
        });
    }

    createPlayer(url){
        this.player = new YT.Player('frame', {         //блок скопирован из YouTube Player API, но внесены изменения
            height: '100%',
            width: '100%',
            videoId: `${url}`,                      //будет динамически подк. из аргумента этого метода
            events: {
                'onStateChange': this.onPlayerStateChange.bind(this)       //метод отслеж.состояние плеера. Если этот метод вызвать отдельно от объекта, то this потеряется с доступом к методу и из-за этого необход. прописать bind                                                                                                    
            }
        });
        this.overlay.style.display = 'flex';            //показываем мод окно
    }

    onPlayerStateChange(state){
        try {
            const blockedElem = this.activeBnt.closest('.module__video-item').nextElementSibling;  //получаем 1-го родителя сл. эл-та у активной кнопки
            const playBtn = this.activeBnt.querySelector('svg').cloneNode(true);                   //клонируем полностью селекор 'svg'(иконка play) у активной кн.
    
            if(state.data === 0){               //если польз. досмотрел видео до конца ("state.data === 0" прописано в документации)
    
                if(blockedElem.querySelector('.play__circle').classList.contains('closed')){         //если у забл.эл. есть этот класс
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();                                      //уд. иконку замка
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);                //доб. иконку play
                    blockedElem.querySelector('.play__text').classList.remove('attention');         //уд. надпись рядом с иконкой
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.style.opacity = '1';
                    blockedElem.style.filter = 'none';
    
                    blockedElem.setAttribute('data-disabled', 'false');
                }            
            }
    
        } catch (error) {}
            
        

    }

    init(){                                                                  
        if(this.btns.length > 0){               //если есть хоть одна кнопка, то условие сработает 
            const tag = document.createElement('script');                       //этот блок кода скопирован из YouTube Player API 
            tag.src = "https://www.youtube.com/iframe_api";                     //создается эл. и помещается на стр перед гл. родителем script 
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}

