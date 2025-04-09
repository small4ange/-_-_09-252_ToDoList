import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskListComponentTemplate(status) {
    const {status_en, status_ru} = status;
    return (`<div class="tasks-container">
            <p class="tasks-title title--${status_en}">${status_ru}</p>
        </div>`);
}

export default class TaskListComponent extends AbstractComponent{
    constructor(status) {
        super();
        this.status = status;
    }
    get template(){
        return createTaskListComponentTemplate(this.status);
    }
}