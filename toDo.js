
var input = document.getElementById("inputBox");
var add = document.getElementById("add");
var taskContainer = document.getElementById("taskContainer");
var taskArr = [];

input.focus();

add.onclick = addTask;
input.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) addTask();
});

function handleClick(){
    this.classList["toggle"]("completed");
    const taskId = this.id;
    for(let i = 0; i < taskArr.length; i++){
        const taskObject = taskArr[i];
        if(taskObject.id.toString() === taskId) taskObject.isCompleted = !taskObject.isCompleted;
    }

    setTasks();
}

function handleDblClick(){
    const currentVal = this.innerText;
    const taskId = this.id;
    for(let i = 0; i < taskArr.length; i++) {
        if(taskArr[i].id.toString() === taskId) taskArr.splice(i,1);
    }
    
    setTasks();
    this.remove();
}

function setTasks(){
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function getTasks(){
    let tasks = localStorage.getItem("tasks");
    if (!tasks){
        return;
    }
    tasks = JSON.parse(tasks);
    for(index in tasks){
        const taskObj = tasks[index];
        createTasks(taskObj.id, taskObj.value, taskObj.isCompleted);
        taskArr.push(taskObj);
    }
}

function createTasks(taskId, userInput, isCompleted){
    var newTask = document.createElement("div");
    isCompleted ? newTask.setAttribute("class", "task completed") : newTask.setAttribute("class", "task");
    newTask.setAttribute("id", taskId);
    newTask.addEventListener("click", handleClick);
    newTask.addEventListener("dblclick", handleDblClick);
    newTask.innerText = userInput;
    input.value = "";
    taskContainer.appendChild(newTask);
}

getTasks();

function addTask(){
    var userInput = input.value;
    if(userInput != ""){
        let count = 0;

        for (let i = 0; i < userInput['length']; i++){
            if (userInput[i] === ' ') count++;
        }
        if (count === userInput.length) {
            input.value = "";
            return alert("Enter valid Task");
        }

        let taskObj = {};
        const taskId = Math.random();

        taskObj.value = userInput;
        taskObj.isCompleted = false;
        taskObj.id = taskId;

        taskArr.push(taskObj);
        setTasks();
        createTasks(taskId, userInput, false);
    }

    else alert("Enter some task");
}