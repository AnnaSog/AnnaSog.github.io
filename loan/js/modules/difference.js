export default class Difference{
    constructor(oldOfficer, newOfficer, items){
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);       //карточки
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;                                      //счетчик карточек
            this.newCounter = 0; 
        } catch (error) {}
    }

    bindTriggers(container, items, counter){
        container.querySelector('.plus').addEventListener('click', ()=>{
            if(counter !== items.length - 2){                  //если счетчик не равен последним 2 карточкам
                items[counter].style.display = 'flex';              //то тогда показываем карточки
                items[counter].classList.add('animated', 'fadeIn');
                counter++;                                      
            }else{
                items[counter].style.display = 'flex';            //если равен 2 карточкам, то показывается 
                items[items.length - 1].remove();                //а затем посл.карточка удаляется  
            }
        });

    }

    hideItems(items){
        items.forEach((item, i, arr) => {              // i - порядковый №, arr - ссылка на [] где items,т.е.oldOfficer или new Officer
            if(i !== arr.length - 1){                 //если не явл.посл.массивом 
                item.style.display = 'none';
            }
        });
    }

    init(){
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);  
        } catch (error) {}           
        

    }
}
