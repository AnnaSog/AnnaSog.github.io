
'use strict';

const filter = () =>{
    const menu = document.querySelector('.content__tabs'),
            items = menu.querySelectorAll('li'),
            btnAll = menu.querySelector('.all'),
            btnNew = menu.querySelector('.new'),
            btnRecommendation = menu.querySelector('.recommendation'),
            wrapper = document.querySelector('.content__items'),
            markAll = wrapper.querySelectorAll('.all'),
            markNew = wrapper.querySelectorAll('.new'),
            markRecommendation= wrapper.querySelectorAll('.recommendation');        

    
    const typeFilter = (markType) =>{
        markAll.forEach(mark =>{     
            mark.style.display = 'none'; 
            mark.classList.remove('animated', 'fadeIn');
        });

        if(markType){       
            markType.forEach(mark =>{
                mark.style.display = 'block'; 
                mark.classList.add('animated', 'fadeIn');      
            });
        }

    };

    btnAll.addEventListener('click', () =>{
        typeFilter(markAll);
    });
    
    btnNew.addEventListener('click', () =>{
        typeFilter(markNew);
    });
    btnRecommendation.addEventListener('click', () =>{
        typeFilter(markRecommendation);
    });


    menu.addEventListener('click', (e) =>{ 
        let target = e.target;          

        if (target && target.tagName === 'LI'){  
            items.forEach(btn => btn.classList.remove('active'));    
            target.classList.add('active');  
        
        }
    });

};

filter();


