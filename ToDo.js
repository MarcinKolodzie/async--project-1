class ToDo {

    constructor(url) {
        this.url = url || '/data1.json'
        this.container = null
        this.tasks = []

        this.loadTasks()
    }

    loadTasks() {
        fetchData(this.url)
            .then((data) => {
                const tasks = data && data.tasks
                this.setTasks(tasks || [])
            })
        // return JSON.parse(localStorage.getItem(this.storageKey))
    }

    setTasks(newTasks) {
        this.tasks = newTasks

        // we cant save items without knowledge about REST API
        // localStorage.setItem(this.storageKey, JSON.stringify(this.tasks))

        this.render()
    }

    deleteTask(indexToDelete) {
        const newTasks = this.tasks.filter((taskData, index) => {
            return index !== indexToDelete
        })
        this.setTasks(newTasks)
    }

    addTask(text) {
        const newTaskData = {
            text: text,
            isComplited: false,
        }

        const newTasks = this.tasks.concat(newTaskData)
        this.setTasks(newTasks)
    }

    toggleComplite(indexToComplite) {
        const newTasks = this.tasks.map((taskData, index) => {
            if (index !== indexToComplite) return taskData
            return {
                text: taskData.text,
                isComplited: !taskData.isComplited
            }
        })
        this.setTasks(newTasks)
    }

    renderTasks() {
        this.tasks.forEach((taskData, index) => {
            const task = new Task(
                taskData,
                () => this.toggleComplite(index),
                () => this.deleteTask(index)
            )
            this.container.appendChild(task.render())
        })

    }

    render() {
        if (this.container === null) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        const form = new Form('', (value) => this.addTask(value))

        this.container.appendChild(form.render())


        this.renderTasks()

        return this.container
    }

}