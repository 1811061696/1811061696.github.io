// đầu tiên chuowg trình sẽ chạy file này và import attach
import { attach } from "./store.js";
import App from '../component/App.js'
attach(App,document.getElementById('root')) // attach có các đối số là component(App) và thẻ hiển thị