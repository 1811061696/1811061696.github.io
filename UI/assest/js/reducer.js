const init = { // khỏi tạo giá trị ban đầu để reducer có thể gọi và trả về
    cars: ['BMW']
}

export default function reducer(state = init, action, args) { //state: giá trị ban đầu của hàm chính là thằng init
    switch (action){
        case 'ADD':  // bắt sự kiện thêm
            const [newCar] = args  // khai báo newCar = giá trị mới truyền vào trong hàm reducer()
            return{  // trả lại một obj mới
                ...state, // được tạo từ obj cũ 
                cars: [...state.cars, newCar] // thêm giá trị newCar vào cuối mảng cars
            }
         
        default:  // trong trường hợp lần đầu thì các case chưa được thực hiện nên sẽ thực hiện default
            return state // trả về giá trị khỏi tạo ban đầu
    }
}