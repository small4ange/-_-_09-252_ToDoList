import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function emptyTaskComponentTemplate() {
    return `<div class="empty-task-container">
        <p class="empty-task-text">Перетащите карточку</p>
    </div>`
}
export default class EmptyTaskComponent extends AbstractComponent{
    get template() {
        return emptyTaskComponentTemplate();
    }

}