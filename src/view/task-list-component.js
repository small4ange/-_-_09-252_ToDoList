import { createElement } from "../framework/render.js";


function createTaskListComponentTemplate(status) {
    const {status_en, status_ru} = status;
    return (`<div class="tasks-container">
            <p class="tasks-title title--${status_en}">${status_ru}</p>
            
        </div>`);
}

export default class TaskListComponent {
    constructor(status) {
        this.status = status;
    }
    getTemplate(){
        return createTaskListComponentTemplate(this.status);
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