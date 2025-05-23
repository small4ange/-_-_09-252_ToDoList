import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import {UserAction} from '../const.js';
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

    async init() {
        await this.#tasksModel.init();
        this.#clearBoard();
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
                status_ru: StatusLabel[status],
            },
            this.#handleTaskDrop.bind(this));

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
                const newClearButtonComponent = new ClearButtonComponent({onClick: this.#handleClearBasketClick.bind(this)});
                render(newClearButtonComponent, taskListComponent.element);
            }
        });
    }
    
    #renderBoard(){
        render(this.#tasksBoardComponent, this.#boardContainer); // отрисовка .container в .task-board
        this.#renderTasksList();
    }
    async createTask() {
        const taskTitle = document.querySelector('.new-task-text').value.trim();
        if(!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.new-task-text').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
        }
    }
    #handleModelChange(event, payload){
        switch(event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
        
    }
    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
    async #handleClearBasketClick() {
        try {
            await this.#tasksModel.clearBasketTasks();
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err);
        }
    }

    async #handleTaskDrop(taskId, newStatus, beforeTaskId = null) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus, beforeTaskId);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err);
        }
        
    }
}