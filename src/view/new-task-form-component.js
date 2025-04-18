import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNewTaskFormComponentTemplate() {
    return (`<form class="new-task">
        <h2 class="new-task-title">Новая задача</h2>
        <div>
            <input type="text" class="new-task-text" placeholder="Напишите что-нибудь...">
            <button class="add-new-task">+ Добавить</button>
        </div>
    </form>`);
}

export default class NewTaskFormComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}){
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }
    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }

    get template() {
        return createNewTaskFormComponentTemplate();
    }
}

