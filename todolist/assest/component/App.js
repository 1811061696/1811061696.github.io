import html from "../js/core.js";  // import html bên file core đẻ thực hiện các điều luật cho thẻ html
import {connect} from '../js/store.js'    // import connect
import Header from "./header.js";
import Todolist from "./Todolist.js";
import Footer from "./Footer.js";

const connector = connect() // thực thi hàm connect và trả lại một hàm mới connector Chính là hàm con trong hàm connect trong filr core,js

function App({ todos }) {
    return html`
    <section class="todoapp">
        ${Header()}
        ${todos.length >0 && Todolist()}
        ${todos.length >0 && Footer()}
    </section>
    `
    // khi thực hiên onclick thì sẽ gọi tới dispatch bên file core.js
}

export default connector(App)  // connector nhận đối số là 1 component nên truyền App cho connector