const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function updateMessage() {
    // const textLength = tasks.querySelectorAll("li"); //we can also get all li in the tasks ul by using this type
    const textLength = tasks.children.length;
    messageSpan.textContent = `You have ${textLength} pending tasks.`;
}

updateMessage();

addForm.addEventListener("submit", event => {
    event.preventDefault();
    // console.log(addForm.task.value);
    const value = addForm.task.value.trim()

    if (value.length) {
        // console.log(value);
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`;
        addForm.reset();
        updateMessage();
    }
});

tasks.addEventListener("click", event => {
    // console.log(event.target);
    if (event.target.classList.contains("delete")) {
        // console.log(event.target);
        event.target.parentElement.remove();
        updateMessage();
    }
});

clearAll.addEventListener("click", event => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(item => {
        item.remove();
    });
    updateMessage();
})

function filterTask(term){
    // tasks.children is giving HTMLCOLLECTION so we want to convert it to Array to iterate.
    Array.from(tasks.children)
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide");
    });

    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.remove("hide");
    });
}

searchForm.addEventListener("keyup", event => {
    // console.log(searchForm.task.value); //Another way of writing the value.
    const term = event.target.value.trim().toLowerCase();
    console.log(term);
    filterTask(term);
})

searchForm.addEventListener("click", event => {
    if (event.target.classList.contains("reset")) {
        searchForm.reset();
        const term = event.target.value.trim();
        filterTask(term);
    }
})

