import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";


function createClearButtonComponentTemplate(status) {
    return (`<button class="clear-button"> × Очистить</button>`);
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }
    get template(){
        return createClearButtonComponentTemplate(this.status);
    }
    #clickHandler = (evt) => {
        console.log('clickHandler');
        evt.preventDefault();
        this.#handleClick();
    }
}