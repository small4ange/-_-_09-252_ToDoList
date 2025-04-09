import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate() {
    return (`<section class="container"></section>`);
}

export default class TaskBoardComponent extends AbstractComponent {
    get template(){
        return createTaskBoardComponentTemplate();
    }
}