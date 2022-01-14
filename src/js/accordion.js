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

	this.start();
}

/**
 * Starts the Accordion
 */
AccordionHS.prototype.start = function () {
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
		switch (event.key) {
			case 'ArrowUp':
				this.moveToElement(
					targetItem.previousElementSibling || lastAccordionItem
				);
				break;
			case 'ArrowDown':
				this.moveToElement(targetItem.nextElementSibling || firstAccordionItem);
				break;
			case 'Home':
				this.moveToElement(firstAccordionItem);
				break;
			case 'End':
				this.moveToElement(lastAccordionItem);
				break;
		}
	});
};

/**
 * Moves the focus to the next element
 * @param {HTML Element} element - This is the next element
 */
AccordionHS.prototype.moveToElement = function (element) {
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

export default AccordionHS;
