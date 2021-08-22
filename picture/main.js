import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

window.addEventListener('DOMContentLoaded', ()=>{
    'use strict';

    modals();
    sliders('.feedback-slider-item', 'horizont', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    // showMoreStyles('.button-styles', '.styles-2'); //вариант показа скрытых карточек на стр
    showMoreStyles('.button-styles', '#styles .row'); //вариант размещения карточек на стр из базы данных
    calc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    pictureSize('.sizes-block');
    // accordion('.accordion-heading','.accordion-block'); //I вариант
    accordion('.accordion-heading'); //II вариант
    burger('.burger', '.burger-menu');
    scrolling('.pageup');
    drop();
});