import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";


function createClearButtonComponentTemplate(status) {
    return (`<button class="clear-button"> × Очистить</button>`);
}

export default class ClearButtonComponent extends AbstractComponent {
    constructor(status) {
        super();
        this.status = status;
    }
    get template(){
        return createClearButtonComponentTemplate(this.status);
    }
}