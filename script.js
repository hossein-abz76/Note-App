const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let tasks = [];

let $ = document;
const addNewNoteBtn = $.querySelector(".add-box");
const popupBox = $.querySelector(".popup-box");
const closeIcon = $.querySelector(".content header .uil-times");
const popupTitle = $.querySelector(".content header p");
const inputElem = $.querySelector("form .title input");
const textareaElem = $.querySelector("form .description textarea");
const buttonElem = $.querySelector("form button");
const taskContainer = $.querySelector(".wrapper");
const openMenuIcon = $.querySelector(".settings");


function addTask() {
	if (inputElem.value && textareaElem.value) {
		let newTask = {
			taskTitle: inputElem.value,
			taskTextArea: textareaElem.value,
			taskDate: taskDate(),
		};
		tasks.push(newTask);
		setToLocalStorage(tasks);
		generateTasks(tasks)
		closePopUp()
	}
}


function generateTasks(tasksArray) {
	$.querySelectorAll('.note').forEach(li=> li.remove())
	
	tasksArray.forEach(task=>{
		taskContainer.insertAdjacentHTML('beforeend', `
		<li class="note">
        <div class="details">
          <p>${task.taskTitle}</p>
          <span>${task.taskTextArea}</span>
        </div>
        <div class="bottom-content">
          <span>${task.taskDate}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li>
                <i class="uil uil-pen"></i>Edit
              </li>
              <li>
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
		`)
	});
	
}

function showPopUp() {
	popupBox.classList.add("show");
	popupTitle.innerHTML = "Add New Task";
	buttonElem.innerHTML = "Add New Task";
}

function closePopUp() {
	popupBox.classList.remove("show");
	clearInput()
	
}
function taskDate() {
	let date = new Date()
	let month = date.getMonth()
	let day = date.getDate()
	let year = date.getFullYear()
	let weakNum = date.getDay()
	return `${months[month]} ${day}, ${year}(${days[weakNum]})`
}

function setToLocalStorage(tasksArray) {
	localStorage.setItem("Items", JSON.stringify(tasksArray));
}

function clearInput() {
	inputElem.value = "";
	textareaElem.value = "";
}

addNewNoteBtn.addEventListener("click", showPopUp);
closeIcon.addEventListener("click", closePopUp);
buttonElem.addEventListener("click", addTask);
window.addEventListener('load', ()=>{
	let getFromLS = JSON.parse(localStorage.getItem('Items'));
	if (getFromLS) {
		tasks = getFromLS
		generateTasks(tasks)
	}

})
window.addEventListener('keydown', (e)=>{
	if (e.code === 'Escape') {
		closePopUp()
	}

})

// این مورد رو هم درست کنم که اگر هرجایی بجز روی پاپ آپ کلیک کنم محو بشه