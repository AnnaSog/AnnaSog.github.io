const pictureSize = (imgSelector) =>{
    const blocks = document.querySelectorAll(imgSelector);

    //фун-ия принятия блока и показа
    function showImg (block){
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';  //берет текущую строку удаляет посл 4 симв и доб. в конец '-1.png'
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {  //все р-параграфы, кроме .sizes-hit(Хит продаж), будут скрыты
            p.style.display = 'none';
        });
    }

    //фун-ия скрытия изоб после отведении мышки о блока
    function hideImg(block){
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';  //берет текущую строку удаляет посл 6 симв.(-1.png) и добавляет в конец '.png'
        block.querySelectorAll('p').forEach(p => {  //все р-параграфы будут показаны
            p.style.display = 'block';
        });
    }

    //перебираем все блоки и навешиваем обработчик событий
    blocks.forEach(block =>{
        block.addEventListener('mouseover', () =>{ //мышь над эл-ом
            showImg(block);
        });

        block.addEventListener('mouseout', () =>{ //мышь над эл-ом
            hideImg(block);
        });
    });
};

export default pictureSize;