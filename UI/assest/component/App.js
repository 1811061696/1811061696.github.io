import html from "../js/core.js";  // import html bên file core đẻ thực hiện các điều luật cho thẻ html
import {connect} from '../js/store.js'    // import connect

const connector = connect() // thực thi hàm connect và trả lại một hàm mới connector Chính là hàm con trong hàm connect trong filr core,js

function App({cars}) {
    return html`
        <ul>
            ${cars.map(car => `<li>${car}</li>`)}
        </ul>

        <button onclick="dispatch('ADD', 'Mayback')">Add car</button>
    `
    // khi thực hiên onclick thì sẽ gọi tới dispatch bên file core.js
}

export default connector(App)  // connector nhận đối số là 1 component nên truyền App cho connector