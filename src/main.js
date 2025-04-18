import HeaderComponent from "./view/header-component.js";
import NewTaskFormComponent from "./view/new-task-form-component.js";

import { render, RenderPosition } from "./framework/render.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from './model/task-model.js';

const bodyContainer = document.querySelector('.board-app');

const mainContainer = document.querySelector('.add-task');

const tasksBoardContainer = document.querySelector('.task-board');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
});
const newTaskFormComponent = new NewTaskFormComponent({ //добавление обработчика клика на кнопку создания таски
    onClick: handleNewTaskButtonClick
});
function handleNewTaskButtonClick () {
    tasksBoardPresenter.createTask();
}
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(newTaskFormComponent, mainContainer);

tasksBoardPresenter.init();

