/**
 * Accordion JS Library
 * (c) 2021 Héctor Sevilla, MIT License, https://www.hectorsevillasandoval.com/
 */

function AccordionHS(options = {}) {
	// Creating Settings Object
	const settings = Object.assign(
		{
			container: '.accordion',
			itemClassName: 'accordion__item',
			itemTitleClassName: 'accordion__item-title',
			itemActiveClassName: 'accordion__item--open',
		},
		options
	);

	// Avoid Overriding settings
	Object.freeze(settings);
	// Adding properties to THIS
	Object.defineProperties(this, {
		settings: {
			value: settings,
		},
	});

	// this.container = '.accordion';
	// this.itemClassName = 'accordion__item';
	// this.activeItemClassName = 'accordion__item--open';

	// Starting the accordion
	this.start();
	//this.init();
}

/**
 * Starts the Accordion
 */
AccordionHS.prototype.start = function () {
	console.log('Starting the accordion');
	// Selecting Elements
	const accordions = document.querySelectorAll(this.settings.container);
	// Throws an error if no valid accordion selector
	if (!accordions.length) this.showError();

	// Add event listener to all the accordions
	accordions.forEach((accordion) => {
		// Each accordion will receive an event Listener
		this.accordionListener(accordion);
	});
};

/**
 * This will add an event listener to each accordion
 * @param {Accordion} accordion - Accordion HTML Element
 */
AccordionHS.prototype.accordionListener = function (accordion) {
	this.a11yNavigation(accordion);
	accordion.addEventListener('click', (event) => {
		//Clicked item
		const clickedTitleButton = event.target;
		if (
			clickedTitleButton.classList.contains(this.settings.itemTitleClassName)
		) {
			const isOpen =
				clickedTitleButton.getAttribute('aria-expanded') === 'true';

			if (!isOpen) {
				this.closeActiveAccordion(accordion);
				this.openAccordion(clickedTitleButton);
				return;
			}
			this.closeActiveAccordion(accordion);
		}
	});
};

/**
 * This opens an accordion tab
 * @param {button} buttonTitle
 */
AccordionHS.prototype.openAccordion = function (buttonTitle) {
	const itemContainer = buttonTitle.parentNode;
	buttonTitle.setAttribute('aria-expanded', 'true');
	itemContainer.classList.add(this.settings.itemActiveClassName);
};

/**
 * This function close an active accordion
 * @param {accordion} accordion - Accordion HTML Element
 */
AccordionHS.prototype.closeActiveAccordion = function (accordion) {
	const openedButtonItem = accordion.querySelector('[aria-expanded="true"]');
	const openedItem = openedButtonItem ? openedButtonItem.parentNode : null;
	if (openedItem && openedButtonItem) {
		openedButtonItem.setAttribute('aria-expanded', 'false');
		openedItem.classList.remove('accordion__item--open');
	}
};

/**
 * This function enable a11y suggested navigation
 * @param {accordion} accordion - Accordion HTML Element
 */
AccordionHS.prototype.a11yNavigation = function (accordion) {
	const accordionItems = accordion.querySelectorAll(
		`.${this.settings.itemClassName}`
	);
	const firstAccordionItem = accordionItems[0];
	const lastAccordionItem = accordionItems[accordionItems.length - 1];

	accordion.addEventListener('keydown', (event) => {
		const targetItem = event.target.parentNode;

		console.log('target item= ', event.key);
		switch (event.key) {
			case 'ArrowUp':
				this.moveFocusToPreviousElement(
					targetItem.previousElementSibling || lastAccordionItem
				);
				break;
			case 'ArrowDown':
				this.moveFocusToNextElement(
					targetItem.nextElementSibling || firstAccordionItem
				);
				break;
		}
	});
};

/**
 * Moves the focus to the next element
 * @param {HTML Element} element - This is the next element
 */
AccordionHS.prototype.moveFocusToNextElement = function (element) {
	console.log('Showing Next Item', element);
	element.querySelector('button').focus();
};

/**
 * Moves the focus to the previous element
 * @param {HTML Element} element - This is the previous element
 */
AccordionHS.prototype.moveFocusToPreviousElement = function (element) {
	console.log('Showing Previous Item');
	element.querySelector('button').focus();
};

/**
 * Shows an Error Message
 * @returns Error Message
 */
AccordionHS.prototype.showError = function () {
	const errorMessage = `The container=${this.settings.container} is not valid`;
	return console.error(errorMessage);
};
