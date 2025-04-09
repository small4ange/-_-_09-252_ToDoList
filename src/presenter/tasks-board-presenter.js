import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";

import { render, RenderPosition } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #boardTasks = [];
    tasksBoardComponent = new TaskBoardComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.boardTasks = [...this.#tasksModel.getTasks()];

        render(this.tasksBoardComponent, this.#boardContainer); // отрисовка .task-board
        Object.keys(Status).forEach(key => {
            const taskListComponent = new TaskListComponent({status_en: Status[key], status_ru: StatusLabel[Status[key]]});
            render(taskListComponent, this.tasksBoardComponent.getElement()); // отрисовка .tasks-container
            const boardStatusTasks = this.boardTasks.filter((elem) => elem.status == Status[key]); // достаем все задачи этого списка
            
            boardStatusTasks.forEach((task) => {
                const taskComponent = new TaskComponent({task: task});

                render(taskComponent, taskListComponent.getElement());
            });
            if((key == 'BASKET') && (boardStatusTasks.length != 0)) {
                const clearButtonComponent = new ClearButtonComponent();
                render(clearButtonComponent, taskListComponent.getElement());
            }
        });
    }
}