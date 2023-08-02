const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copymsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_=<>?{,./";:}'
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
setIndicator("#ccc");
// password length ko slider se sync krta hai
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // for slider range color
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)}+"% 100%"
}
function setIndicator(color) {
    indicator.style.backgroundcolor = color;
    //shadow - HW
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomInteger() {
    return getRndInteger(0, 9);
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));

}
function generateSymbols() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = true;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (numbersCheck.checked) {
        hasNum = true;
    }
    if (symbolsCheck.checked) {
        hasSym = true;
    }
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }
    // copied msg 
    copyMsg.classList.add("active");
    // visible time
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}
inputSlider.addEventListener("input", function () {
    passwordLength = inputSlider.value;
    handleSlider();
    lengthDisplay.innerText = inputSlider.value;
})
function setIndicator(color) {
    indicator.style.backgroundcolor = color;
}
copyBtn.addEventListener("click", function () {
    if (passwordDisplay.value)
        copyContent();
});


// this is an shuffling algorithm
// Fisher yates Method
function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i * 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    })
    // if we select 4 checkboxes then password mus contain atleast 4 letter
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
})
generateBtn.addEventListener("click", function () {
    // if no checkbox is checked
    // if (checkCount <= 0)
    //     return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";

    // generating element using Array
    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomInteger);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbols);
    }
    // compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    // remaining letters
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    // shuffling the password for security

    // sending password in form of array to shuffle
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calcStrength();
});