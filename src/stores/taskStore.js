import {defineStore} from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {id: 1, title: "Learn Vue 3", isFav: false, isDone: true},
            {id: 2, title: "Learn Pina", isFav: true, isDone: false},
            {id: 3, title: "Lear React", isFav: true, isDone: true},
            {id: 4, title: "Learn Angular", isFav: false, isDone: true},
            {id: 5, title: "Learn GoLang", isFav: false, isDone: false},
        ]
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav)
        },
        done() {
            return this.tasks.filter(t => t.isDone)
        },
        unDone() {
            return this.tasks.filter(t => !t.isDone)
        },
        favCount() {
            return this.tasks.reduce((prev, cur) => {
                return cur.isFav ? prev + 1 : prev
            }, 0)
        },
        doneCount() {
            return this.tasks.reduce((prev, cur) => {
                return cur.isDone ? prev + 1 : prev
            }, 0)
        },
        undoneCount() {
            return this.tasks.reduce((prev, cur) => {
                return cur.isDone === false ? prev + 1 : prev
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length;
        }
    },
    actions : {
        addTask(task) {
            this.tasks.push(task);
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id);
        },
        toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;
        },
        toggleDone(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isDone = !task.isDone;
        },
    }
})
