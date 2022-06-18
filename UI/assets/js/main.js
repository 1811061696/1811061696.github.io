/* 
        Ghi chú cho bài này
                1. Function thực chất là 1 object trong javascript
                2. Mà đã là object thì có thể thêm thuộc tính cũng như method.
                3. Validator.isRequired() giống như obj.method()
                4. Giá trị trả về của Validator.isRequired() và các rule khác sẽ được
                lưu vào array lại chính là đối số truyền vào Validator
                5. Khi nhận được đối số thì Validator bắt đầu làm công việc validate và hiển thị
                kết quả validate của thằng test, khi đã đủ các options truyền vào rồi 
                thì công việc là hiển thị các invalid input nhờ vào 1 vài logic và 
                thao tác DOM
                6. Khá khoai và ảo ma Canada :))))
*/



// tạo đối tượng `Validator`
function Validator(options){
    function getParent(element, selector) {  // tạo hàm tìm kiếm thẻ
        while(element.parentElement){ // Điều kiện nếu thẻ element có thẻ parentElement(là thẻ cha của nó thì thực hiện lặp)
            if(element.parentElement.matches(selector)){ // kiểm tra element.parentElement(nếu thẻ cha của thẻ element có class selector(class muốn tìm) )
                return element.parentElement;   // thì trả về thẻ chứa class đó
            }
            element = element.parentElement; // nếu thẻ cha của element không có class muốn tìm thì gán lại thẻ ca đó có element và tiếp tục lặp đẻ tìm thằng cha của thằng cha
            // cấu trúc:   con--> tìm cha (nếu cha k có class muốn tìm thì gán lại cha = con) --> tiếp tục tìm cha --> đến khi gặp thẻ cha có class cần tìm thì trả về thẻ đó 
        }
    }

    var selectorRule = {}; // tạo selectorRule để luu tất cả các rule của tất cả selector

    function validate(inputElement, rule) {  // hàm thực thi các điều luật của thẻ input
        //value: inputElement.value  --> lấy ra nội dung được nhập trong thẻ input
        // test function:  rules.test   --> gọi tới hàm điều luật

        var errElement = getParent(inputElement, options.formGroupSelect).querySelector(options.errorSelector); // gọi hàm  getParent truyền vào(inputElement: vị trí bắt đầu tìm) ,options.formGroupSelect(Giá trik muốn tìm, Được gán bên file index)
        var errorMesege ; // kiểm tra nếu thẻ input có nội dung thì errorMesege = undefile
                                                            // nếu thẻ input không có nội dug thì errorMesege ='Trường bắt buộc' đã đk khai báo ở diều luật


        // lấy ra các rules của selector
        var rules = selectorRule[rule.selector]; // kiểm tra nếu rules === thẻ inputs 

        // lặp qua ừng rule và kiểm tra
        for(var i = 0; i < rules.length; ++i){
            switch(inputElement.type){   //truyền điều kiện là  type của thẻ input
                case 'checkbox':  // nếu thuộc kiểu checkbox và radio thì thực hiện code trong case
                case 'radio':
                    errorMesege = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );

                break;
                default: // các trường hợp khác ngoài 2 trường hợp trên
                    errorMesege = rules[i](inputElement.value); //trả ra lỗi tương ứng với rules ở thẻ input tương ứng
                }
                if(errorMesege) break;// nếu có lỗi thì dừng việc kiểm
        }   
        
        
        if (errorMesege){
            errElement.innerText = errorMesege;  // khi có lỗi(iput trống) thì đoạn text trong thẻ form-message == nội dung lỗi
            getParent(inputElement, options.formGroupSelect).classList.add('invalid');  // thêm class invalid cho thẻ cha của thẻ input: getParent(inputElement, options.formGroupSelect)(lấy ra thẻ cha của thẻ input)
        }
        else{
            errElement.innerText = '' // khi imput có thông tin thì không hiện gì cả
            getParent(inputElement, options.formGroupSelect).classList.remove('invalid') // xóa class invalid cho thẻ cha của thẻ input
        }
                    

        return !errorMesege; // phủ định của lỗi là không lỗi( trả về true)
    }
    

    var formElement = document.querySelector(options.form); // lấy ra thẻ chứa form-1

    if(formElement){ // nếu có formElement
        formElement.onsubmit = function(e) { // lắng nghe sự kiện khi nhấn nút đăng kí
            e.preventDefault();  // bỏ hành vi mặc định của thẻ submit

            var isFormValid = true; // biến kiểm trả các lỗi trên các thẻ input // mặc định bạn đầu là true(không có lôi);

            // lặp qua tưng rules và validate hết luôn
            options.rules.forEach(function(rule) {// duyệt qua các phần tử có trong mảng rules
                var inputElement = formElement.querySelector(rule.selector) // lấy ra tất cả các thẻ selector
                var isValid = validate(inputElement, rule); // gợi tới hàm thực thi các điều luật và truyền vào các rule
                if(!isValid) { // nếu hàm thực thi trả về lỗi 
                    isFormValid = false; // thì gán lại giá trị cho biến kiểm tra lỗi
                }
            });

            // kiểm tra và in ra giá trị người dùng đã nhập 
            if(isFormValid){ // nếu isFormValid = true( không có lỗi)   
                // trường hợp submit với javascrip
                if(typeof options.onSubmit === 'function'){ // kiểm tra options.onSubmit trả về function

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')  // tạo biến enableInputs chứa tất cả các thẻ input có [name] và không có disabled(thẻ input không bấm được)

                    var formValues = Array.from(enableInputs).reduce(function(value, input) {//  Array.from chuyển đổi sang kiểu array, reduce lặp qua các phần tử của mảng 
                        switch(input.type){ // tạo vòng lặp truyền vào tipe của thẻ input
                            case 'radio': // nếu type === radio 
                                value[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value; // lấy ra value của thẻ input được checked
                                break;
                            case 'checkbox': // nếu type == checkbox
                            if(!input.matches(':checked')) {
                                value[input.name] = ''; // trong trường hợp người dùng không chọn gì thì trả về một mảng rông
                                return value; // kiểm tra nếu thẻ inputs không được ckeck thì trả về giá rị của nó luôn(giá trị trống)   
                            }
                                if (!Array.isArray(value[input.name])) { // kiểm tra nếu các giá trị mà người dùng chọn không trả về một mảng
                                    value[input.name] = [];// gán nó thành 1 mảng
                                }
                                value[input.name].push(input.value)// truyền vào mảng các giá trị được người dùng chọn
                                break; // thoát khỏi vòng lặp

                            case 'file': // trong trường hợp thẻ input là trường nhập vào 1 file
                                value[input.name] = input.files;
                                break;

                            default:
                                value[input.name] = input.value;  // khác 2 type trên thì vẫn lấy gt được truyền vào từ người dùng
                        }
                        return  value; // trả về  value = giá trị người dùng nhập vào
                    },{});//{} giá trị khởi tạo là 1 obj rỗng --> trả về cũng sẽ là 1 obj
                    options.onSubmit(formValues); // call back gọi lại hàm onSubmit và truyền vào formValues
                }

                // trường hợp submit với hành vi mặc định
                else{
                    formElement.submit();
                }
            }
            


        }




        options.rules.forEach(function(rule) { // duyệt qua các phần tử có trong mảng rules

            // lưu lại các  rule cho mỗi input
            if(Array.isArray(selectorRule[rule.selector])){ // kiểm tra selectorRule[rule.selector]) có phải là 1 array hay không
                selectorRule[rule.selector].push(rule.test); // nếu có thì thực hiện thêm  rule.test(Điều luật) vào selectorRule
            }

            // mặc định lúc đầu selectorRule không phải là array( vì khai báo là một obj trống) nên sẽ thực hiện else trước.
            // sang vòng lặp t2 nếu có thêm rule.test mói thì sẽ thêm vào array
            else{ // nếu không phải là một array
                selectorRule[rule.selector] = [rule.test]; // lưu rule.test vào selectorRule
            }



            var inputElements = formElement.querySelectorAll(rule.selector) // lấy ra các thẻ input fullname và email
                                                                                        // sau đó dùng querySelector để lấy ra thẻ .form-message trực tiếp của thẻ cha


            Array.from(inputElements).forEach(function(inputElement) { // Array.form(inputElements: chuyển inputElements từ kiểu  sang kiểu array và thực hiện lặp qua các phần tử của mảng đó   
                inputElement.onblur = function() { // lắng nghe sự kiện onblur(sự kiện bỏ click ra khỏi ô input)
                    
                    validate(inputElement, rule); // gợi tới hàm sử lý điều luật của thẻ input
                }

                // xử lý mỗi khi người dùng nhập
                 var errElement = getParent(inputElement, options.formGroupSelect).querySelector(options.errorSelector); // Từ thẻ getParent(inputElement, options.formGroupSelect) để gọi tới thẻ chứa errorSelector: được khai báo bên file index
                inputElement.oninput = function () {  // bắt sự kiện mỗi khi người dùng gõ vào ô input
                    errElement.innerText = ''; // khi người dùng gõ thì cảnh báo lỗi không hiện
                    getParent(inputElement, options.formGroupSelect).classList.remove('invalid') // xóa class invalid khỏi thẻ cha của thẻ input
                }
            });
        });

    }
}

// định nghĩa các rules(điều luật)
// nguyên tắc của các rules
// 1. khi có lỗi thì trả ra mesege lỗi
// 2 . Khi hợp lệ thì không trả ra gì
Validator.isRequired = function(selector, message){ // tạo hàm định nghĩa luật cho fullname
    return {
        selector: selector, // trả về địa chỉ tìm kiếm = giá trị truyền vào bên file index ( trong trường hợp này là #fullname)
        test: function(value) { // kiểm tra các thao tác của người dùng
            

            return value ? undefined : message || 'Trường bắt buộc' // khi có value(nội dung trong input) thì không thông báo gì, Khi không có value thì in ra trường bắt buộc
            // value.trim(): loại bỏ khoảng cách ở 2 đầu đoạn text 
        }
    }
}



Validator.isEmail = function(selector,message) { // tạo hàm định nghĩa luật cho Email
    return {
        selector: selector, // trả về địa chỉ tìm kiếm = giá trị truyền vào bên file index( trong trường hợp này là #email)
        test: function(value) { // kiểm tra các thao tác của người dùng

            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //  diều kiện kiểm tra email
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng email';
        }
    }
}


Validator.minLenght = function(selector, min, message) { // tạo hàm minLength  là hàm định nghĩa luật cho password
    return {
        selector: selector, //trả về địa chỉ tìm kiếm = giá trị truyền vào bên file index( trong trường hợp này là #email)
        test: function(value) { // kiểm tra thao tác của người dùng
            return value.length >= min ? undefined : message || `Password phải ít nhất ${min} kí tự`
            // nếu số kí tự người dùng nhập vào >= min(được truyền bên file index) thì không báo lỗi nếu <6 kí tự thì báo lỗi
        }
    }
}


Validator.isConfirmed = function(selector, getConfimValue, message) { // tạo hàm isConfirmed là hàm định nghĩa các luật cho nhâp lại password
    return {
        selector: selector,
        test: function(value) {
            return value ===  getConfimValue()? undefined: message|| 'Giá trị nhập vào không chính xác'
            // trả về kết quả: Nếu value(người dùng nhập vào) === return của hàm getConfimValue() thì trả về undefined
                                // nếu value khác return của hàm getConfimValue() thì trả về đoạn mesege
                                // retuen của hàm getConfimValue() được truyền vào bên file index
        }
    }
}