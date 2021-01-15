import './scss/main.scss';
console.log('Hello, SASS');
console.log('Hello, HTML');

let calculator = document.querySelector("#calculator");
let fullNumber = "";
let fullNumber2 = "";
const display = calculator.querySelector("textarea");
let oneNumber = "";
let twoNumber = "";
let operatorSign = "";

calculator.addEventListener("mousedown", (event) => {
    if (event.target.tagName == "DIV") {
        event.target.classList.add("active");

        if (event.target.classList.contains("numbers")) {
            if (oneNumber == "") {
                fullNumber += event.target.textContent;
                display.innerText = fullNumber;
            }
            if (oneNumber != 0) {
                fullNumber2 += event.target.textContent;
                display.innerText = fullNumber2;
            }

        } else {
            if (oneNumber == "") {
                operatorSign = event.target.textContent;
                oneNumber = fullNumber;
                console.log(oneNumber);
                fullNumber = "";
                display.innerText = "";
            }
            if (oneNumber != 0) {
                twoNumber = fullNumber2;
                console.log(twoNumber);
                fullNumber2 = "";
                display.innerText = "";
            }
        }
    }

    switch (operatorSign) {
        case "+":
            display.innerText = Number(oneNumber) + Number(twoNumber);
            break;
        case "-":
            display.innerText = Number(oneNumber) - Number(twoNumber);
            break;
        case "*":
            display.innerText = Number(oneNumber) * Number(twoNumber);
            break;
        case "/":
            display.innerText = Number(oneNumber) / Number(twoNumber);
            break;
    }
    console.log(oneNumber, operatorSign, twoNumber);
});

calculator.addEventListener("mouseup", (event) => {
    calculator.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
});