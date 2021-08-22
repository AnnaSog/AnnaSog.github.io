const burger = (burgerSelector, menuSelector)=>{
    const burgerElem = document.querySelector(burgerSelector),
        menuElem = document.querySelector(menuSelector);
    
    menuElem.style.display = 'none';                        //изначально меню скрыто

    burgerElem.addEventListener('click', ()=> {
        if(menuElem.style.display == 'none' && window.screen.availWidth < 993){          //если меню скрыто и ширина всего экрана(availWidth) меньше 993
            menuElem.style.display = 'block';
        }else{
            menuElem.style.display = 'none'; 
        }
    });

    window.addEventListener('resize', ()=>{
        if(window.screen.availWidth > 992){         //если размер экрана больше 992, то меню скрываем
            menuElem.style.display = 'none'; 
        }      
    });
};
export default burger;