import {generateID} from '../utils.js';
import {UpdateType} from '../const.js';
import {UserAction} from '../const.js';
import Observable from '../framework/observable.js';

export default class TasksModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;

        } catch (err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }
    get tasks(){
        return this.#boardtasks;
    }

    async addTask(taskTitle) {
        const newTask = {
            title: taskTitle,
            status:'backlog',
            id:generateID(),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }


    deleteBasketTasks(taskId)
    {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket');
        this._notify(UserAction.DELETE_TASK, {id: taskId });
    }
    async clearBasketTasks(){
        const basketTasks = this.#boardtasks.filter((task) => task.status === 'basket');
        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket');
            this._notify(UserAction.DELETE_TASK, {status: 'basket' });
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере: ', err);
            throw err;
        }
    }
    hasBasketTasks() {
        return this.#boardtasks.some(task => task.status === 'basket');
    }
    async updateTaskStatus(taskId, newStatus, beforeTaskId = null) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if(taskIndex === -1) return;
        const [task] = this.#boardtasks.splice(taskIndex, 1);

        let insertIndex = this.#boardtasks.length; //в конец по умолчанию
        if(beforeTaskId){
            const beforeIndex = this.#boardtasks.findIndex(task => task.id === beforeTaskId);
            if(beforeIndex != -1){
                insertIndex = beforeIndex;
            }
        }
        const previousStatus = task.status;
        task.status = newStatus;
        try {
            const updatedTask = await this.#tasksApiService.updateTask(task);
            Object.assign(task, updatedTask);
            this.#boardtasks.splice(insertIndex, 0, task);
            this._notify(UserAction.UPDATE_TASK, task);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи на сервер:', err);
            task.status = previousStatus;
            throw err;
        }
        
        
        

    }
}

