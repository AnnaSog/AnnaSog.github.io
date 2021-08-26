export default class Forms{
    constructor(forms){
        this.forms = document.querySelectorAll(forms);
        this.inputs =document.querySelectorAll('input'); 
       
    }
 
    checkTextInputs(){                                //заполнение email только на латинице 
        this.txtInputs = document.querySelectorAll('[name="email"]');

        this.txtInputs.forEach(input => {
            input.addEventListener('keypress', function(e){      //'keypress' - польз.нажимает на определен. клавишу
                if(e.key.match(/[^a-z 0-9 @ \.]/ig)){    
                    e.preventDefault();
                }
            });
    
            input.addEventListener('input', ()=>{                //если польз.внес сохраненные данные на кирилл, то они очищаются
                if(input.value.match(/[а-яё]/ig)){
                    input.value = '';
                }
            });
        });
    }

    //метод по очистке input
    clearInput() {
        this.inputs.forEach(item =>{
            item.value = '';
        });
    }
    
    //метод по отравке данных на сервер
    postDatas(){

        let message = {
            loading: 'Loading...',
            success: 'Thank you! We will contact you soon',
            failure: 'Something went wrong...'
        };

        const postData = async(url, data) =>{
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
    
            return await res.text();
        };

        this.forms.forEach(item =>{
            item.addEventListener('submit', (e) =>{
                e.preventDefault(); //отключaем перезагрузку
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.style.cssText='font-size: xx-large;';
                item.appendChild(statusMessage); //помещаем в конец формы
    
    
                const formData = new FormData(item);
                //FormData это объект, ктр соберет все содержание в инпутах и поместить в перемен formData
    
                //отправляем переменую postData на сервер 
                postData('assets/question.php', formData)
                .then(res =>{
                    console.log(res);
                    statusMessage.textContent= message.success;
                })
                .catch ( ()=>{
                    statusMessage.textContent= message.failure;
                })
                .finally ( ()=>{
                    this.clearInput();
                    setTimeout ( ()=>{
                        statusMessage.remove();  
                    },5000);
                });
    
    
            });
        });
    }

    init(){
        this.clearInput();
        this.postDatas();
        this.checkTextInputs();


    }


    

}