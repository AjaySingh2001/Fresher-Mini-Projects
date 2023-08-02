const input = document.querySelector('input');
const btn = document.querySelector('.addTask');
btn.addEventListener("click", () => {
    const notCompleted = document.querySelector('.notCompleted');
    const completed = document.querySelector('.completed');
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fa fa-check"/>'
    delBtn.innerHTML = '<i class="fa fa-trash"/>'
    if (input.value !== '') {
        console.log(input.value)
        // insert the input text into new line
        newLi.textContent = input.value;

        // empty the input value for next one
        input.value = '';

        // add this new line in not completed
        notCompleted.appendChild(newLi);
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);

    }
    checkBtn.addEventListener("click", function(){
        const parent = this.parentNode;
        parent.remove();
        completed.appendChild(parent);
        checkBtn.style.display = "none";
    });
    delBtn.addEventListener("click", function(){
        const parent = this.parentNode;
        parent.remove();
    });
})
