const filter = () =>{
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          btnAll = menu.querySelector('.all'),
          btnLovers = menu.querySelector('.lovers'),
          btnChef = menu.querySelector('.chef'),
          btnGirl = menu.querySelector('.girl'),
          btnGuy = menu.querySelector('.guy'),
          btnGrandmother = menu.querySelector('.grandmother'),
          btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          markGirl = wrapper.querySelectorAll('.girl'),
          markLovers = wrapper.querySelectorAll('.lovers'),
          markChef = wrapper.querySelectorAll('.chef'),
          markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');


    //фун-ия фильтрации эл. по типу, вскрытие ненужных, показ нужных
    const typeFilter = (markType) =>{
        markAll.forEach(mark =>{        //перебираем все эл.на гл обертке(wrapper),где все изображения и скрываем их
            mark.style.display = 'none'; 
            mark.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';          //также скрываем пока пустое контент grandmother и granddad
        no.classList.remove('animated', 'fadeIn');

        if(markType){       //если контект заполнен,т.е. нажата кнопка и в этом блоке есть изображения, то их показ
            markType.forEach(mark =>{
                mark.style.display = 'block'; 
                mark.classList.add('animated', 'fadeIn');      
            });
        }else{
            no.style.display = 'block';           //также показываем контент grandmother и granddad
            no.classList.add('animated', 'fadeIn'); 
        } 
    };

    btnAll.addEventListener('click', () =>{
        typeFilter(markAll);
    });
    btnChef.addEventListener('click', () =>{
        typeFilter(markChef);
    });
    btnGirl.addEventListener('click', () =>{
        typeFilter(markGirl);
    });
    btnLovers.addEventListener('click', () =>{
        typeFilter(markLovers);
    });
    btnGuy.addEventListener('click', () =>{
        typeFilter(markGuy);
    });
    btnGrandmother.addEventListener('click', () =>{
        typeFilter(); //без аргумента и срабатывает условие в else
    });
    btnGranddad.addEventListener('click', () =>{
        typeFilter();
    });

    //порабатываем с табами (menu)
    menu.addEventListener('click', (e) =>{ //при делегирован.необходимо е - event
        let target = e.target;              //эл. на ктр происходит событие

        if (target && target.tagName === 'LI'){  //если эл. поддерживает событие и имя события LI
            items.forEach(btn => btn.classList.remove('active'));   //то у всех кн меню удаляем класс актив  
            target.classList.add('active');   //на эл ктр кликнул польз - добавляем
        
        }
    });

};

export default filter;



