// II ВАРИАНТ реализации с помощью js-анимаций
const accordion = (triggersSelector) =>{
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn =>{
        btn.addEventListener('click', function(){

            btns.forEach(btn =>{                                    //весь контент скрыт, будет работать только действующая кнопка с контентом, все ост будут закрыты
                btn.classList.remove('active-style'); 
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = '0px'; 
            });

            this.classList.toggle('active-style');                          //toggle-если есть такой класс, то удалит, если нет-доб. this-эл на ктр кликнули
            this.nextElementSibling.classList.toggle('active-content');     //обращаемся к соседу btn           


            //вносим изм в main.css -.often-questions .accordion-block и создаем блок .often-questions .accordion-block.active-style
            if(this.classList.contains('active-style')){                    //contains-поиск класса
                this.nextElementSibling.style.maxHeight = 
                this.nextElementSibling.scrollHeight + 80 +'px';            //scrollHight-высота контента внутри контента, 80-padding в стилях

            }else{
                this.nextElementSibling.style.maxHeight = '0px';           //если кн не активна - контент скрывается
            }

        });

    });

};
export default accordion;



// // I ВАРИАНТ реализации аккордеона с помощья сss-анимации
// const accordion = (triggersSelector, itemsSelector) =>{
//     const btns = document.querySelectorAll(triggersSelector),
//         blocks = document.querySelectorAll(itemsSelector);


//     blocks.forEach(block =>{                
//         block.classList.remove('animated', 'fadeInDown');
//     });        


//     btns.forEach(btn =>{
//         btn.addEventListener('click', function(){                      //для исп this внутри события нужна обычна фун-ия, не =>{}
//             if(!this.classList.contains('active')){                    //если на нажатой кнопке нет этого класса
//                 btns.forEach(btn =>{                                   //опять перебираем кн    
//                     btn.classList.remove('active', 'active-style');    //и на всех кн удаляем классы  
//                 });
//                 this.classList.add('active', 'active-style');          //а на ту ктр нажали - добавляем
//             }

//         });
//     });

//    //затем переходим в сss в папку в main.css и дописываем блоки
//    //.often-questions .accordion-heading.active+.accordion-block
//    //.often-questions p.active-style span

// };
// export default accordion;