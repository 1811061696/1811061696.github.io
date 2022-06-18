// phần này khó nên cần đọc thật kĩ nghĩ kĩ để có thể hiểu được

export default function html([first, ...strings], ...value) { //first: giá trị ban đầu    ...strings: truyền vào tất cả giá trị còn lại của mảng     ..value: truyền vào tất cả các value
    return value.reduce( //dùng reduce để lặp và lấy ra các phần tử của mảng
        (acc, cur) => acc.concat(cur, strings.shift()), // concat nối các phần tử trong mảng lại với nhau    shift() lấy ra phần tử đầu tiên của mảng sau đó xóa luôn nó khỏi mảng
        [first] // đặt first là giá trị ban đầu của ruduce
    )
    .filter(x => x && x !== true || x === 0) // filter(): lọc           lấy tất cả các giá trị trả về true trừ giá trị  true và lấy cả giá trị === 0 
    .join('') // làm phẳng mảng
}



// khi gọi tới hàm createStore thì sẽ truyền vào một callback là reducer
// sau đó hàm callback sẽ return lại dữ liệu ban đầu của Store và gán vào state
export function createStore(reducer) {  // tạo hàm lưu trữ dữ liệu của ứng dụng
    let state = reducer() // reducer trong trường hợp mặc định thì nó retun giá trị khởi tạo và gá cho nó là state ban đầu 

    const roots = new Map(); // tạo nơi lưu trữ dữ liệu để render ra UI của người dùng

    function render() {
        for(const [root, component] of roots){   // dùng for đẻ map qua root(thẻ hiển thị) và component(nội dung hiển thị)
            const output = component()  //component ở file app và nó là 1 hàm nên ở đây ta chạy hàm và nhận đk html và lưu vào output
            root.innerHTML = output //innerHTML chuyển sang chuoix html để hiển thị ra giao diện người dùng
        }
    }


    return{
        attach(component, root) {
            roots.set(root, component) // set root(vị trí hiển thị),   component: nội dug được hiển thị
            render() // gọi tới hàm render để hiển thị ra giao diện người dùng
        },
        connect(selector = state =>state) {
            return component => (props, ...args) =>  //connect trả về một hàm mà hàm này lại nhận đối số là component mà component lại chính là App nên truyền App bên file App.js
                component(Object.assign({}, props, selector(state),...args)) // sau khi chạy lại tiếp tục trả về 1 hàm nữa và trả lại mọt object
        },                                             // {}, props, selector(state),...args) === cars trong file App({cars})
        dispatch(action,...args) { // hàm dispatch nhận action(hành động)  và ...args(value truyền vào)
            state = reducer(state, action, args) // gọi tới reducer và truyền giá trị state(giá trị ban đầu nhận được), action(truyền vào hành động), args(dữ liệu mới)
            render() // gọi lại hàm render
        }
    }
}