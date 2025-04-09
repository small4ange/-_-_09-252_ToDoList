import { createElement } from "../framework/render.js";

function createNewTaskFormComponentTemplate() {
    return (`<form class="new-task">
        <h2 class="new-task-title">Новая задача</h2>
        <div>
            <input type="text" class="new-task-text" placeholder="Напишите что-нибудь...">
            <button class="add-new-task">+ Добавить</button>
        </div>
    </form>`);
}

export default class NewTaskFormComponent {
    getTemplate() {
        return createNewTaskFormComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }
    removeElement() {
        this.element = null;
    }
}

