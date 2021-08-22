import {postData} from '../services/requests';

const drop = () =>{
    const fileInputs = document.querySelectorAll('[name="upload"]');

    // dragenter - объект над dropArea(любой эл., ктр воспринимает это событие)
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // drop - объект отправлен в dropArea 

    //вешаем на fileInputs все события 
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName =>{            //в [] перечислены обработчики событий для реализации Drag&Drop
        fileInputs.forEach(input =>{
            input.addEventListener(eventName, preventDefaults, false);        
        });
    });

    function preventDefaults(e){            
        e.preventDefault();                 //при перетаскиван.файла - не должна по умолчан.открываться в браузере
        e.stopPropagation();                //отмена всплытие
    }

    //доб.идентификатор, чтобы польз. видел над какой областью перетаскивать
    function highlight(item){                                                           //item - эл ктр необходимо подсветить
        item.closest('.file_upload').style.border = "5px solid yellow";                 //closest - ищет блок выше по иерархии 
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)"; 
    }

    function unhighlight(item){                                                         //отмена подсветки
        item.closest('.file_upload').style.border = "none";            
        if(item.closest('.calc_form')){                                                 //если у формы есть этот родитель
            item.closest('.file_upload').style.backgroundColor = "#fff";               //то фон становится белым
        }else{
           item.closest('.file_upload').style.backgroundColor = "#ededed";              //если нет, то фон серый (как в мод окне)
        }
    }


    ['dragenter', 'dragover'].forEach(eventName =>{            //эти 2 события вызывают подсветку, далее на каждый input вешаем событие и подставляем highlight
        fileInputs.forEach(input =>{
            input.addEventListener(eventName, () => highlight(input), false);        
        });
    });

    ['dragleave', 'drop'].forEach(eventName =>{            //эти 2 события убирают подсветку
        fileInputs.forEach(input =>{
            input.addEventListener(eventName, () => unhighlight(input), false);        
        });
    });

    fileInputs.forEach(input =>{                        
        input.addEventListener('drop', (e) =>{                                 //когда польз. отпускает файл, 
            input.files = e.dataTransfer.files;                                //то этот файл помещается в input.files (dataTransfer - тот объект с файлами, ктр перетаскивается из файловой структуры)

            let dots;                                                          //будет содержать ... или .
            const arr = input.files[0].name.split('.');                         //разбивает назв 1-ого файла до . 
            arr[0].length > 6 ? dots='...' : dots = '.';                        //и если первое слово больше 6 симв, то в перем.dots ...
            //название, ктр отражается вместо "Файл не выбран" 
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;                      //в предыд.эл (Файл не выбран) помещаем переменую name

            // postData для блока с загрузкой фото, но без кнопки отправить "Отправить"
            if(input.closest('.mail')){
                let formData = new FormData();
                input.files.forEach(file =>{
                    formData.append('image', file);
                    postData('assets/server.php', formData)
                     .then(res =>console.log(res))
                     .catch (err =>console.log(err)); 
                });

            }

        });
    });


};

export default drop;