import html from "../js/core.js";  // import html bên file core đẻ thực hiện các điều luật cho thẻ html
import { connect } from'../js/store.js'

const connector =  connect()

function Todoitem({ todo, index, editIndex }) {
    return html`
        <li 
            class="${todo.completed && 'completed'} 
            ${editIndex === index && 'editing'}"
        >
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox"
                    ${todo.completed && 'checked'}
                    onchange = "dispatch('toggle', ${index})"
                >
                <label ondblclick="dispatch('startEdit', ${index})">${todo.title}</label>
                <button class="destroy" onclick = "dispatch('delete', ${ index })"></button>
            </div>
            <input 
                class="edit" 
                value="${todo.title}"
                onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim()) || event.keyCode === 27 && dispatch('cancelEdit')"
                onblur="dispatch('endEdit', this.value.trim())"
            >
        </li>
    `}

export default connector(Todoitem)  