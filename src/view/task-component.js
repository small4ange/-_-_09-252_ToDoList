import { createElement } from "../framework/render.js";

function createTaskBoardComponentTemplate() {
    return (`<li class="task">Название задачи</li>`);
}

export default class TaskComponent {
    getTemplate(){
        return createTaskBoardComponentTemplate();
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