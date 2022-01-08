/**
 * Accordion JS Library
 * (c) 2021 Héctor Sevilla, MIT License, https://www.hectorsevillasandoval.com/
 */

function AccordionJS(container = null) {
	if (!container) throw new Error('Please specify a container');

    this.itemClass = 'accordion__item';

    this.init();
	
}

AccordionJS.prototype.init = function(){
    // add Event Lister to the document
    document.body.addEventListener('click', e => {
        if(e.target.parentNode.className.includes(this.itemClass)){
            const currentItem = e.target.parentNode.parentNode;
            currentItem.classList.add('accordion__item--open');
        }
        
    });
}