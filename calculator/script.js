const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = " ";

const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        output = eval(output.replace("%", "/100"));
    }
    else if (btnValue === "AC") {
        output = "";
    }
    else if (btnValue === "DL") {
        output = output.toString().slice(0, -1);
    }
    else {
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value=output;
}
    // event listener for buttons and calculate()
    buttons.forEach((button) => {
        // button listener calls calculate with dataset
        button.addEventListener("click", (e) => calculate(e.target.dataset.value));
    })