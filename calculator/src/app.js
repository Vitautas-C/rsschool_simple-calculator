import './scss/main.scss';
console.log('Hello, SASS');
console.log('Hello, HTML');

let numbers = document.querySelectorAll(".numbers");
let operations = document.querySelectorAll(".operators");
let decimalBtn = document.querySelector("#dot");
let clearBtns = document.querySelectorAll(".clear");

let display = document.querySelector("#display");
let MemoryCurrentNubmer = "0";
let MemoryNewNubmer = false;
let MemoryPendingOperation = "";


for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener("click", (e) => {
        numberPress(e.target.textContent);
    });
};


for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener("click", (e) => {
        operation(e.target.textContent);
        console.log(e.target.textContent);
    });
};


for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("id"));
        clear(e.target.getAttribute("id"))
    });
};


let numberPress = (number) => {
    if (MemoryNewNubmer) {
        display.value = number;
        MemoryNewNubmer = false;
    } else {
        if (display.value == "0") {
            display.value = number;
        } else {
            display.value += number;
        };
    }
};


let operation = (operationButton) => {
    let localOperationMemory = display.value;

    if (MemoryNewNubmer && MemoryPendingOperation != "=") {
        display.value = MemoryCurrentNubmer;
    } else {
        MemoryNewNubmer = true;
        switch (MemoryPendingOperation) {
            case "+":
                MemoryCurrentNubmer += parseFloat(localOperationMemory);
                break;
            case "-":
                MemoryCurrentNubmer -= parseFloat(localOperationMemory);
                break;
            case "*":
                MemoryCurrentNubmer *= parseFloat(localOperationMemory);
                break;
            case "/":
                MemoryCurrentNubmer /= parseFloat(localOperationMemory);
                break;
            default:
                MemoryCurrentNubmer = parseFloat(localOperationMemory);
                break;
        };
    };
    display.value = MemoryCurrentNubmer;
    MemoryPendingOperation = operationButton;
};


let decimal = () => {
    let localDecimalMemory = display.value;
    if (MemoryNewNubmer) {
        localDecimalMemory = "0.";
        MemoryNewNubmer = false;
    } else {
        if (localDecimalMemory.indexOf(".") == -1) {
            localDecimalMemory += ".";
        };
    };
    display.value = localDecimalMemory;
};

decimalBtn.addEventListener("click", decimal);

let clear = (clearButton) => {
    switch (clearButton) {
        case "ce":
            display.value = 0;
            MemoryNewNubmer = true;
            break;
        case "c":
            display.value = 0;
            MemoryNewNubmer = true;
            MemoryCurrentNubmer = 0;
            MemoryPendingOperation = "";
            break;
        case "bs":
            if (display.value.length > 1) {
                display.value = display.value.substring(0, display.value.length - 1);
            } else {
                display.value = 0;
            }
            break;
    };
};



calculator.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("btns")) {
        event.target.classList.add("active");
    }
});

calculator.addEventListener("mouseup", (event) => {
    if (event.target.textContent == "=") {
        calculator.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    }
    if (event.target.classList.contains("operators") == false) {
        calculator.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    }
});