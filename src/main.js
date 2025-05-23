import HeaderComponent from "./view/header-component.js";
import NewTaskFormComponent from "./view/new-task-form-component.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from './model/task-model.js';
import TasksApiService from "../markup/task-api-service.js";

const END_POINT = 'https://6825fa13397e48c913147879.mockapi.io/'

const bodyContainer = document.querySelector('.board-app');

const mainContainer = document.querySelector('.board-app__main');

const newTaskContainer = document.querySelector('.add-task');

const tasksBoardContainer = document.querySelector('.task-board');

// передаем taskapiservice в taskmodel

const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

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
render(newTaskFormComponent, newTaskContainer);

tasksBoardPresenter.init();

