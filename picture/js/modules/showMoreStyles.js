import {getResource} from '../services/requests';

//ВАРИАНТ ПОДГРУЗКИ КАРТОЧЕК НА СТР ИЗ БАЗЫ ДАННЫХ (С СЕРВЕРА)
// const showMoreStyles = (trigger, wrapper) =>{
//     const btn = document.querySelector(trigger);
    
//     btn.addEventListener('click', function(){
//        // getResource('assets/db.json') //можно сразу прописать адрес к базе данных, не использ.сервер
//             //.then(res=>createCard(res.styles)) //styles - объект со стилями в db.json

//         getResource('http://localhost:3000/styles')
//             .then(res=>createCard(res))
//             .catch (()=>{
//                 let statusMessage = document.createElement('div');
//                 statusMessage.classList.add('status');
//                 statusMessage.textContent= "Что-то пошло не так..";
//                 statusMessage.style.cssText = 'text-align: center;font-size: 250%;color:red'; 
//                 document.querySelector(wrapper).appendChild(statusMessage);
//             });    

//         this.remove();
//     });


//     function createCard(resporse){                      //после получен.ответа от сервера будет создан блок с карточками с данными из bd.json
//         resporse.forEach(({src, title, link}) =>{       //из item(resporse) сразу вытаскиваем эти переменные, прописав в {}
//             let card = document.createElement('div');

//             card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
//             card.innerHTML = `
//             <div class='styles-block'>
//                 <img src=${src} alt ='style'>
//                 <h4>${title}</h4>
//                 <a href=${link}>Подробнее</a>
//             </div>
//             `;

//             document.querySelector(wrapper).appendChild(card);  //получаем доступ к обертке куда разместим наш блок
//         });
//     }
// };

// export default showMoreStyles;



//ВАРИАНТ ПОКАЗА СКРЫТЫХ КАРТОЧЕК (ИЗ ВЕРТСТКИ) НА СТР (необходимо добавить эти блоки в вертску) 
const showMoreStyles = (trigger, styles) =>{
    const btn = document.querySelector(trigger),
        cards = document.querySelectorAll(styles);
    
    cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');   //назначаем анимацию всем карточкам
    });

    btn.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        btn.remove();
    });
};

export default showMoreStyles;
