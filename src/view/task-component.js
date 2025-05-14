import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    const {title, status} = task;
    return (`<div class="task task--${status}" data-id="${task.id}">
        <div class="task__body">
            <p class="task--view">${title}</p>
        </div>
        </div>`);
}

export default class TaskComponent extends AbstractComponent {
    constructor({task}){
        super();
        this.task = task;
        this.#afterCreateElement();
    }
    get template(){
        return createTaskComponentTemplate(this.task);
    }
    #afterCreateElement() {
        this.#makeTaskDraggable();
    }
    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);

        this.element.addEventListener('dragstart', (event)=> {
            this.element.classList.add('dragging'); 
            event.dataTransfer.setData('text/plain', this.task.id);//передать id во время выполнения event
        });
        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('dragging');
        });
    }
}