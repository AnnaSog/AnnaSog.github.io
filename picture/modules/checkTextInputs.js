const checkTextInputs = (selector) =>{              //заполнение имени и комм только на рус яз
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e){      //'keypress' - польз.нажимает на определен. клавишу
            if(e.key.match(/[^а-яё 0-9]/ig)){    
                e.preventDefault();
            }
        });

        input.addEventListener('input', ()=>{                //если польз.внес сохраненные данные на латиницы, то они очищаются
            if(input.value.match(/[a-z]/ig)){
                input.value = '';
            }
        });
    });
};

export default checkTextInputs;