import {tasks} from '../mock/task.js';
import {generateID} from '../utils.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks(){
        return this.#boardtasks;
    }

    addTask = (taskTitle) => {
        const newTask = {
            title: taskTitle,
            status:'backlog',
            id:generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }
    addObserver(observer){
        this.#observers.push(observer);
    }

    deleteBasketTasks = () => {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket');
        this._notifyObservers();
    }
    _notifyObservers(){
        this.#observers.forEach((observer) => observer());
    }
    updateTaskStatus(taskId, newStatus, beforeTaskId = null) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if(taskIndex === -1) return;
        console.log("beforetaskid =", beforeTaskId);
        console.log("task.index =", taskIndex);
        const [task] = this.#boardtasks.splice(taskIndex, 1);
        console.log("task =", task);

        let insertIndex = this.#boardtasks.length; //в конец по умолчанию
        if(beforeTaskId){
            const beforeIndex = this.#boardtasks.findIndex(task => task.id === beforeTaskId);
            if(beforeIndex != -1){
                insertIndex = beforeIndex;
            }
        }
        console.log("insertindex =", insertIndex);
        task.status = newStatus;
        this.#boardtasks.splice(insertIndex, 0, task);
        console.log("boardtasks after =", this.#boardtasks);
        this._notifyObservers();

    }
}

