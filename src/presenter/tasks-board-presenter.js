import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";

import { render, RenderPosition } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import EmptyTaskComponent from "../view/empty-task-component.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #boardTasks = [];
    #tasksBoardComponent = new TaskBoardComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }
    #renderTask (task, container) {
        render(new TaskComponent({task}), container);
    }
    #renderEmptyTask(container) {
        render(new EmptyTaskComponent(), container);
    }
    #renderTasksList() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        Object.entries(Status).forEach(([key,status]) => {
            const taskListComponent = new TaskListComponent({
                status_en: status, 
                status_ru: StatusLabel[status]
            });

            render(taskListComponent, this.#tasksBoardComponent.element); // отрисовка .tasks-container

            const boardStatusTasks = this.#boardTasks.filter(task => task.status === status); // достаем все задачи этого списка
            if(boardStatusTasks.length === 0) {
                this.#renderEmptyTask(taskListComponent.element);
            } else {
                boardStatusTasks.forEach((task) => {
                    this.#renderTask(task, taskListComponent.element);
                });
            }
            if(status === `basket`){
                const newClearButtonComponent = new ClearButtonComponent({onClick: this.#clearBasket.bind(this)});
                render(newClearButtonComponent, taskListComponent.element);
            }
        });
    }

    #renderBoard(){
        render(this.#tasksBoardComponent, this.#boardContainer); // отрисовка .task-board
        this.#renderTasksList();
        
    }
    createTask() {
        const taskTitle = document.querySelector('.new-task-text').value.trim();
        if(!taskTitle) {
            return;
        }
        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.new-task-text').value = '';
    }
    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }
    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
    #clearBasket() {
        console.log('clearBasket');
        this.#tasksModel.deleteBasketTasks();
    }

}