import html from "../js/core.js";  // import html bên file core đẻ thực hiện các điều luật cho thẻ html

function Header() {
    return html`
        <header class="header">
            <h1>todos</h1>
            <input 
                class="new-todo" 
                placeholder="What needs to be done?" 
                autofocus
                onkeyup = "event.keyCode === 13  && dispatch('add', this.value.trim())"
            >
		</header>
    `}

export default Header 