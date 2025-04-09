import HeaderComponent from "./view/header-component.js";
import NewTaskFormComponent from "./view/new-task-form-component.js";

import { render, RenderPosition } from "./framework/render.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from './model/task-model.js';

import { StatusLabel } from "./const.js";

console.log(StatusLabel[0]);

const bodyContainer = document.querySelector('.board-app');

const mainContainer = document.querySelector('.add-task');

const tasksBoardContainer = document.querySelector('.task-board');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskFormComponent(), mainContainer);

tasksBoardPresenter.init();

