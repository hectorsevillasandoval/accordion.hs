/**
 * Accordion JS Library
 * (c) 2021 Héctor Sevilla, MIT License, https://www.hectorsevillasandoval.com/
 */

function AccordionJS(container = null) {
	if (!container) throw new Error('Please specify a container');

	this.itemClass = 'accordion__item';
	this.activeItemClass = 'accordion__item--open';

	this.init();
}

AccordionJS.prototype.init = function () {
	// add Event Lister to the document
	document.body.addEventListener('click', (e) => {
		if (e.target.className.includes(this.itemClass)) {
			this.currentItem = e.target.parentNode;
			if (this.currentItem.className.includes(this.activeItemClass)) {
				this.toggle();
				return;
			}
            this.close();
            this.open();
		}
	});
};

AccordionJS.prototype.open = function () {
    console.log('open');
	this.currentItem.classList.add('accordion__item--open');
};
AccordionJS.prototype.toggle = function () {
	console.log('toggle');
    this.currentItem.classList.toggle('accordion__item--open');
};
AccordionJS.prototype.close = function () {
    console.log('close');
    const currentAccordion = this.currentItem.closest('.accordion');
    const openedItem = currentAccordion.querySelector('.accordion__item--open');
    if( openedItem ) openedItem.classList.remove('accordion__item--open');
};
