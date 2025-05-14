import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";


function createTaskListComponentTemplate(status) {
    const {status_en, status_ru} = status;
    return (`<div class="tasks-container">
            <p class="tasks-title title--${status_en}">${status_ru}</p>
        </div>`);
}

export default class TaskListComponent extends AbstractComponent{

    constructor(status, onTaskDrop) {
        super();
        this.status = status;
        this.#setDropHandler(onTaskDrop);
    }
    get template(){
        return createTaskListComponentTemplate(this.status);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;
    
        container.addEventListener('dragover', (event) => {
            event.preventDefault();
    
            const afterElement = this.#getDragAfterElement(container, event.clientY);
            const placeholder = this.element.querySelector('.drag-placeholder') || this.#createPlaceholder();
    
            if (afterElement) {
                this.element.insertBefore(placeholder, afterElement);
            } else {
                this.element.appendChild(placeholder);
            }
        });
    
        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const afterElement = this.#getDragAfterElement(container, event.clientY);
            const placeholder = this.element.querySelector('.drag-placeholder');
            placeholder?.remove();
    
            const insertBeforeId = afterElement?.dataset?.id || null;
            onTaskDrop(taskId, this.status.status_en, insertBeforeId);
        });
    }
    
    #createPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'drag-placeholder';
        placeholder.style.height = '40px';
        placeholder.style.background = 'rgba(0, 0, 0, 0.1)';
        placeholder.style.margin = '5px 0';
        return placeholder;
      }
    #getDragAfterElement(container, y) {
        // все task из container кроме перетаскиваемой (c классом .dragging)
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
    
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect(); // координаты child
            const offset = y - box.top - box.height / 2; // расстояние от курсора до центра элемента
    
            if (offset < 0 && offset > closest.offset) { //курсор выше центра элемента и ближе к центру чем предыдущие
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
      
    
}