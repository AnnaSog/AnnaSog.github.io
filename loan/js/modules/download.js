export default class Download {
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path){                           //создаем элемент-ссылку
        const elem = document.createElement('a'); //'a' создается ссылка

        elem.setAttribute('href', path);               //создается атрибут с ссылкой на адрес
        elem.setAttribute('download', 'nice_picture');  //обязателнй атрибут 'download' и название изображения

        elem.style.display = 'none';
        document.body.appendChild(elem);

        elem.click();
        document.body.removeChild(elem);
    }

    init(){
        this.btns.forEach(btn =>{
            btn.addEventListener('click', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}