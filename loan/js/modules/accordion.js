export default class Accordion{
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
    }
      

    showBlock(){
        try {
            this.btns.forEach(btn =>{
                
                btn.addEventListener('click', () =>{                      
                    const sibling = btn.closest('.module__info-show').nextElementSibling;

                    sibling.classList.toggle('msg');
                    sibling.style.marginTop = '20px';
                    sibling.classList.add('animated', 'fadeInDown');
                });                
            
            });                
        } catch (error) {}
            
    }

    init(){
        this.showBlock();
    }

}