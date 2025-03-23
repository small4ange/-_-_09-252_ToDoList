import { createElement } from "../framework/render.js";

function createTaskBoardComponentTemplate() {
    return (`<div class="tasks-container">
            <p class="tasks-title">Название блока задач</p>
            <div class="task-list">
                <ul class="task-list-ul">
                </ul>
            </div>
        </div>`);
}

export default class TaskListComponent {
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