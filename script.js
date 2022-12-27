fetch('https://script.googleusercontent.com/macros/echo?user_content_key=11auq0YCcgZ6HDbED44p_cZaiVGgUgY6N3scddHCDr2AGB4hWo34z2ADudW6isSQIrKHznnG0ZJOUeIz3sl3DvxbBX2GbsxSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNBdIpmx2pC0uVKlMqrQcxp8wNkaW-Lsx81iRH9XJIiPpSrrrhPYFn77iSn88O6EH1yndWVvKQBLnRCsYtEnDjXwKqV75iVJ-w&lib=MK6OwehVkFE9UxOZiRiNYMIOOOqnL9WSI')
            .then(res => res.json())
            .then(data => {
                // let tr= [];
                // console.log(data.content.length)
                // for (i=2; i<data.content.length; i++){
                //     tr += data.content[i];
                // }
                // document.querySelector("#dbtask").innerHTML = tr;
                
                
                
                let tr = data.content.reduce((prev, cur) => {

                    let td = cur.map(value => `<code>${value}</code>`)

                    return prev + `<div class="tasks">${td.join(" ")}</div>`
                }, "\r")
                document.querySelector("#dbtask").innerHTML = tr;
 });


 let form = document.querySelector("form");
 form.addEventListener('submit', (e) => {
     e.preventDefault();
     document.querySelector("#sub").value = "Submiting..";
     let data = new FormData(form);
     fetch('https://script.google.com/macros/s/AKfycbxho5DptHBMmSC41NumIhyBb3pyob0NO7PZYHAVFqJ9IqNv-h7xzSsvllocWsrF7sel/exec', {
             method: "POST",
             body: data
         })
         .then(res => res.text())
         .then(data => {
             alert(data);
             document.querySelector("#sub").value = "Add Database"
             form.reset();
         });
 })

let inputEle = document.querySelector(".input");
let inputEl = document.querySelector("#link");
let submitEle = document.querySelector("#add");
let tasksDiv = document.querySelector(".tasks");
let containerDiv = document.querySelector(".container");
let deleteAll = document.querySelector(".delete-all");
let arrayOfTasks =[];
// console.log(inputEle)

if(window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
getTaskFromLocalStorage();

submitEle.onclick = function() {
    if(inputEle.value !== "") {
        addTaskToArray(inputEle.value, inputEl.value);
        
        inputEle.value ="";
        inputEl.value ="";
    }
}

function addTaskToArray (taskText, taskLink) {
    const task = {
        id : Date.now(),
        title : taskText,
        link : taskLink,
        complated : true,
    };
    arrayOfTasks.push(task);
    // console.log(arrayOfTasks);
    addTaskToPage(arrayOfTasks);

    addTaskToLocalStorage(arrayOfTasks);
}

function addTaskToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";

    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if(task.complated){
            div.className = "task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        div.appendChild(document.createTextNode(task.link));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span);
        tasksDiv.appendChild(div)
        // console.log(div)
    });
}


function addTaskToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}
function getTaskFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        // console.log(tasks)
        addTaskToPage(tasks);
    }
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
      // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}

// Click On Task Element
tasksDiv.onclick = ((e) => {
    if (e.target.classList.contains("del")) {
        // e.target.parentElement.remove();
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        updateStatusInLocalStorage(e.target.getAttribute("data-id"));
    }
})


function deleteTaskFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTaskToLocalStorage(arrayOfTasks);
}
function updateStatusInLocalStorage(taskId) {
    arrayOfTasks.forEach((task) =>{
        if(task.id == taskId)
            task.complated == false ? task.complated = true:task.complated = false;
    });

    addTaskToLocalStorage(arrayOfTasks);
}

deleteAll.onclick = function(e){
    tasksDiv.innerHTML = "";
    window.localStorage.removeItem("tasks")
}



