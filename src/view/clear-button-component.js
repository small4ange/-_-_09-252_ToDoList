import { createElement } from "../framework/render.js";


function createClearButtonComponentTemplate(status) {
    return (`<button class="clear-button"> × Очистить</button>`);
}

export default class ClearButtonComponent {
    constructor(status) {
        this.status = status;
    }
    getTemplate(){
        return createClearButtonComponentTemplate(this.status);
    }
    getElement(){
        if(!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }
    removeElement() {
        this.element = null;
    }
}