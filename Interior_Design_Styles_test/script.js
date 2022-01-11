const slides = document.querySelectorAll('.slide'),
    hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close'), 
    input = document.querySelector('#search_input'),
    list = document.querySelectorAll('.menu__link');


input.oninput = function(e){
    const value = e.target.value.trim(); // trim() - удаляет пробелы
    
    if(value !== '') {
        list.forEach(elem => {
            if(elem.innerText.toLowerCase().search(value) == -1){  //если совпадение не найдено(-1)
                elem.classList.add('hide');                      //то элементы иcчезают
            } 
        });
    }else{
        list.forEach(elem => {
            elem.classList.remove('hide');
        });
    }
};

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        slides.forEach(slide => {
            slide.classList.remove('active'); 
        });
        slide.classList.add('active');
    });
});

hamburger.addEventListener('click', () =>{
    menu.classList.add('active');
});       

close.addEventListener('click', () =>{
    menu.classList.remove('active');
}); 




