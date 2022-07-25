var container = document.querySelector(".container");
var resultUi = document.querySelector(".result");


var calculation = [];
var start = 0;
var lastResult = 0;



const arrNumberButton = [
  {
    name: "7",
    text: 7,
    click: "getNumberButton('7')",
  },
  {
    name: "8",
    text: 8,
    click: "getNumberButton('8')",
  },
  {
    name: "9",
    text: 9,
    click: "getNumberButton('9')",
  },
  {
    name: "multiply",
    text: "*",
    click: "getMathButton('*')",
  },
  {
    name: "4",
    text: 4,
    click: "getNumberButton('4')",
  },
  {
    name: "5",
    text: 5,
    click: "getNumberButton('5')",
  },
  {
    name: "6",
    text: 6,
    click: "getNumberButton('6')",
  },
  {
    name: "plus",
    text: "+",
    click: "getMathButton('+')",
  },
  {
    name: "1",
    text: 1,
    click: "getNumberButton('1')",
  },
  {
    name: "2",
    text: 2,
    click: "getNumberButton('2')",
  },
  {
    name: "3",
    text: 3,
    click: "getNumberButton('3')",
  },
  {
    name: "minus",
    text: "-",
    click: "getMathButton('-')",
  },
  {
    name: "0",
    text: 0,
    click: "getNumberButton('0')",
  },
  {
    name: "dot",
    text: ".",
    click: "getNumberButton('.')",
  },
  {
    name: "divide",
    text: "/",
    click: "getMathButton('/')",
  },
  {
    name: "clear",
    text: "AC",
    click: "clearAll()",
  },
  {
    name: "equal",
    text: "=",
    click: "calculateQueue(calculation)",
  },
];

// hiển thị button
const createNumberButton = () => {
  arrNumberButton.forEach((item) => {
    container.innerHTML += `<button id="${item.name}" class="button" 
    onclick="${item.click}"
    >${item.text}</button>`;
  });
};
createNumberButton();


// thêm value của nút được click vào mảng
function addToQueue(start) {
  calculation.push(start);
}


// clear 
function clearAll() {
  calculation = [];
  start = 0;
  resultUi.innerHTML = "";
}



// hiển thị number
function getNumberButton(number) {
  if (!(number === ".") || !start.match('[.]')) {  // kiểm tra giá trị nhập vào có phải dấu (.) không
    start += number;
    resultUi.innerHTML += number;
  }
}


// hiển thị các phép tính toán
function getMathButton(math) {
  if (start !== 0 && start !== "-") { 
    start = parseFloat(start); 
    addToQueue(start); 
    addToQueue(math); 
    resultUi.innerHTML += math; 
    start = 0; 
  }
  if (math == "-" && isNaN(calculation[0]) && start !== "-") { // nếu phép tính là phép trừ (-) và phần tử đầu tiên của mảng tính toán không phải là giá trị NAN 
    start = "-"; 
    resultUi.innerHTML = "-";
  }
}


// thực hiện tính toán
function calculateQueue(value) {
    if (start !== 0) { 
      start = parseFloat(start); 
      addToQueue(start);
    }
    
    var result = value[0]; 
    var ckeck = 0;
    for (var i = 2; i < value.length; i = i + 2) { // bắt đầu chạy từ vị trí t2 trong mảng, điểm dừng là độ dài của mảng, bước nhảy 2
      switch (calculation[i - 1]) {  // calculation[i - 1] --> lấy ra toán tử trong mảng
        case "+":
          result += value[i];
          break;
        case "-":
          result -= value[i];
          break;
        case "/":
          if (value[i] === 0) {
            ckeck = 1;
            clearAll();
            resultUi.innerHTML = "ERROR";
          } else {
              result = result / value[i];
              console.log(value[i])
          }
          break;
        case "*":
          result = result * value[i];
          break;
      }
      lastResult = result;
    }
    result = result.toFixed(4) // lấy 4 chữ số sau số thập phân
    result = parseFloat(result); 

    if (ckeck !== 1) {
        resultUi.innerHTML = result;
        start = result;
        calculation = [];
      } 
  }

