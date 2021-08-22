import {postData} from '../services/requests';

const forms = () =>{
    
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name=upload]');
    
    

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok:'assets/img/ok.png',
        fail:'assets/img/fail.png'

    };

    const path = {    //пути по ктр будем отправлять данные
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };


    //переменная с функцией по очистке input
    const clearInput = () =>{
        inputs.forEach(item =>{
            item.value = '';
        });
        upload.forEach(item =>{
            item.previousElementSibling.textContent = "Файл не найден";
        });
    };

    //перебираем каждый инпут с аттрибутом name=upload
    upload.forEach(item =>{
        item.addEventListener('input', () =>{               //как только польз загружил файл
            console.log(item.files[0]);                     //если длинное название, необходимо обрезать
            
            let dots;                                       //будет содержать ... или .
            const arr = item.files[0].name.split('.');      //разбивает назв 1-ого файла до . 
            arr[0].length > 6 ? dots='...' : dots = '.';     //и если первое слово больше 6 симв, то в перем.dots ...
            
            //название, ктр отражается вместо "Файл не выбран" 
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;      //в предыд.эл (Файл не выбран) помещаем переменую name
                         
        });
    });

    form.forEach(item =>{
        item.addEventListener('submit', (e) =>{
            e.preventDefault(); //отключaем перезагрузку

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.style.cssText = 'text-align: center;'; 
            item.parentNode.appendChild(statusMessage); //помещаем в родителя формы
        
            item.classList.add('animated', 'fadeOutUp'); //доб классы анимаций с плавным скрытие(она станет прозрачной)
            setTimeout(()=>{
                item.style.display='none';
            },400); //скроем прозрачную форму через 4 мсек


            let statusImg = document.createElement('img'); //img ктр будет всплывает после отправ формы
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div'); //добавим к изобр текстовое сообщение
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            //FormData это объект, ктр соберет все содержание в инпутах и помещает в перемен formData
            const formData = new FormData(item);
            let api;      //динамический путь куда все будет отпр
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            //отправляем переменую postData на сервер 
            postData(api, formData)
            .then(res =>{
                console.log(res);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent= message.success;

            })
            .catch ( ()=>{
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent= message.failure;
            })
            .finally ( ()=>{
                clearInput();
                setTimeout ( ()=>{
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                },5000);  //через 5 сек удаляется сообщение и планово повляется пустая форма мод окна
            });


        });
    });


};
export default forms;