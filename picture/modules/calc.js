
const calc = (size, material, options, promocode, result) =>{
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;
    
    const calcFunc = () =>{
        sum = Math.round((+sizeBlock.value) *  (+materialBlock.value) + (+optionsBlock.value));

        if(sizeBlock.value == '' || materialBlock.value == ''){          //Обязательны к выбору - первые 2 селекта
            resultBlock.textContent = 'Необходимо выбрать размер картины и материал картины'; 
        }else if(promocodeBlock.value === 'IWANTPOPART'){        //Если в поле “Промокод” введен IWANTPOPART, то общая сумма уменьшается на 30%
            resultBlock.textContent = Math.round(sum * 0.7);
        }else{
            resultBlock.textContent = sum;
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;