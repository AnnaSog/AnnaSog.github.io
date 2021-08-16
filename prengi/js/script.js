
function showTab(tabs, images) {
    const tab = document.querySelectorAll(tabs),
        img = document.querySelectorAll(images);


    function hideTabContent() {
        document.querySelectorAll('.carousel__inner img').forEach(item =>{
            item.style.display = 'none';
        });

        document.querySelector('.title_fz14tan').style.color = 'white';
    }
    

    tab.forEach(item =>{
        item.addEventListener('click', () => {
            hideTabContent();

            img.forEach(item =>{
                item.style.display = 'block';
            });
            
        });

        
    });

}

showTab('.tab_1', '.slider_1');
showTab('.tab_2', '.slider_2');
showTab('.tab_3', '.slider_3');
showTab('.tab_4', '.slider_4');
showTab('.tab_5', '.slider_5');
showTab('.tab_6', '.slider_6');



const hamburger = document.querySelector('.hamburger_wrapper .hamburger'),
        menu = document.querySelector('.menu'),
        close = document.querySelector('.menu__close'),
        overlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () =>{
    menu.classList.add('active');
});       

close.addEventListener('click', () =>{
    menu.classList.remove('active');
}); 

overlay.addEventListener('click', () =>{
    menu.classList.remove('active');
});


function openModal(modals, buttons, x) {

    const modal = document.querySelector(modals),
        close = document.querySelector(x),
        btns = document.querySelectorAll(buttons);
        

    btns.forEach(btn =>  {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
        });  
    });

    close.addEventListener('click', () =>{
        modal.style.display = 'none';
    });

}

openModal('.promo__overlay', '.promo__btn', '.promo__overlay .modal__close');
openModal('.contactYou__overlay', '.contactYou__btn', '.contactYou__overlay .modal__close');


const form = () =>{ 
    const form = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжeмся',
        failure: 'Что-то пошло не так...'
    };

    //переменная с функцией, которая будет отвечать за отправку данных на сервер
    const postData = async(url, data) =>{
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

 
    function clearInput(inputs){

        const input = document.querySelectorAll(inputs);

        input.forEach(item => {
            item.value = '';
        });
    } 
 
    form.forEach(form => {
        form.addEventListener('submit', (e) =>{
            e.preventDefault(); //отключaем перезагрузку
    
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage); //помещаем в конец формы
    
    
            const formData = new FormData(form);
            //FormData это объект, ктр соберет все содержание в инпутах и поместить в перемен formData
    
    
            //отправляем переменую postData на сервер 
            postData('mailer/smart.php', formData)
            .then(res =>{
                console.log(res);
                statusMessage.textContent= message.success;
            })
            .catch ( ()=>{
                statusMessage.textContent= message.failure;
            })
            .finally ( ()=>{
                clearInput('input');
                clearInput('textarea');
                clearInput('checkbox');
                setTimeout ( ()=>{
                    statusMessage.remove();
                },5000);
            });
    
    
        });
    });
    
   
    
};

form();








