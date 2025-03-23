import HeaderComponent from "./view/header-component.js";
import NewTaskFormComponent from "./view/new-task-form-component.js";
import TaskBoardComponent from "./view/task-board-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TaskComponent from "./view/task-component.js";

import { render, RenderPosition } from "./framework/render.js";

// добавление header в body
const bodyContainer = document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// добавление form с новой заметкой в section.add-task
const mainContainer = document.querySelector('.add-task');
render(new NewTaskFormComponent(), mainContainer, RenderPosition.BEFOREEND);

// создаем section.container - доску для задач
let taskBoardComponent = new TaskBoardComponent()
console.log(document.querySelector('.board-app__main'));
render(taskBoardComponent, document.querySelector('.board-app__main'), RenderPosition.BEFOREEND);

//заполняем доску для задач 4-мя столбцами в каждом по 4 задачи
for (let i=0; i<4; i++) {
    console.log(taskBoardComponent.getElement());
    let taskListComponent = new TaskListComponent();
    render(taskListComponent, taskBoardComponent.getElement(), RenderPosition.BEFOREEND);
    for (let j=0; j<4; j++){
        console.log(taskBoardComponent.getElement().querySelector('.task-list-ul'));
        render(new TaskComponent(), taskListComponent.getElement().querySelector('.task-list-ul'), RenderPosition.BEFOREEND);
    }
}
