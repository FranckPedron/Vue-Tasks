import {defineStore} from "pinia";


export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
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
        async getTasks() {
            try {
                this.loading = true;
                const res = await fetch('http://localhost:3000/tasks');
                this.tasks = await res.json();
                this.loading = false;
            }
            catch (e) {
                console.error(e);
            }
        },
        async addTask(task) {
            console.log(task);
            this.tasks.push(task);

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            });

            if (res.error) {
                console.log(res.error);
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id);

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE'
            });

            if (res.error) {
                console.log(res.error);
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'}
            })
        },
        async toggleDone(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isDone = !task.isDone;

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({isDone: task.isDone}),
                headers: {'Content-Type': 'application/json'}
            })
        },
    }
})
