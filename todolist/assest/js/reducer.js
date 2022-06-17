import storage from "../util/storage.js"

const init = { // khỏi tạo giá trị ban đầu để reducer có thể gọi và trả về
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null
}

const actions = {
    add({ todos }, title) {
        if(title) {
            todos.push({ title, completed: false})
            storage.set(todos)
        }
    },

    delete({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },

    toggle( {todos}, index ) {
        const todo = todos[index]
        todo.completed  = !todo.completed
        storage.set(todos)
    },

    toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed )
        storage.set(todos)
    },

    switchFilter(state, filter) {
        state.filter = filter
    },

    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },

    startEdit(state, index) {
        state.editIndex = index
    },

    endEdit(state, title) {
        if(state.editIndex !== null){
            if(title){
                state.todos[state.editIndex].title = title
                state.editIndex = null
                storage.set(state.todos)
            }
            else{
                this.delete(state, state.editIndex)
            }
        }
    },

    cancelEdit(state) {
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) { //state: giá trị ban đầu của hàm chính là thằng init
    actions[action] && actions[action](state,...args) // nếu có actions[action] &&(thì)  chạy chính nó actions[action]()(bởi vì nó là hàm) , truyền cho  nó state(mảng ban đầu và ...args là tất cả nội dung được truyền vào)
    return state
}