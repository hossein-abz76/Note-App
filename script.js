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

let popUpFlag = true;
let updateID;

function addTask() {
	if (!popUpFlag) {
		let allNotes = JSON.parse(localStorage.getItem("Items"));

		allNotes.some((task, index) => {
			if (index == updateID) {
				task.taskTitle = inputElem.value.trim();
				task.taskTextArea = textareaElem.value.trim();
			}
			setToLocalStorage(allNotes);
			generateTasks(allNotes);
		});
	} else {
		if (inputElem.value && textareaElem.value) {
			let newTask = {
				taskTitle: inputElem.value.trim(),
				taskTextArea: textareaElem.value.trim(),
				taskDate: taskDate(),
			};
			tasks.push(newTask);
			setToLocalStorage(tasks);
			generateTasks(tasks);
		}
	}
	closePopUp();
}

function generateTasks(tasksArray) {
	$.querySelectorAll(".note").forEach((li) => li.remove());

	tasksArray.forEach((task, index) => {
		taskContainer.insertAdjacentHTML(
			"beforeend",
			`
		<li class="note">
        <div class="details">
          <p>${task.taskTitle}</p>
          <span>${task.taskTextArea}</span>
        </div>
        <div class="bottom-content">
          <span>${task.taskDate}</span>
          <div class="settings" onclick="showSetting(this)">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick="updateHandler(${index}, '${task.taskTitle}' , '${task.taskTextArea}')">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="deleteHandler(${index})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
		`
		);
	});
}

function updateHandler(index, taskTitle, TaskDesc) {
	popUpFlag = false;
	showPopUp(taskTitle, TaskDesc);
	updateID = index;
}

function deleteHandler(index) {
	let isConfirm = confirm("Are you sure that you want to delete this task?");
	if (isConfirm) {
		tasks.splice(index, 1);
		setToLocalStorage(tasks);
		generateTasks(tasks);
	}
}

function showSetting(el) {
	$.querySelectorAll(".settings").forEach((elem) =>
		elem.classList.remove("show")
	);
	el.classList.add("show");

	document.addEventListener("click", (e) => {
		if (e.target.tagName != "I") {
			el.classList.remove("show");
		}
	});
}

function showPopUp(taskTitle, TaskDesc) {
	if (popUpFlag) {
		popupTitle.innerHTML = "Add New Task";
		buttonElem.innerHTML = "Add New Task";
	} else {
		popupTitle.innerHTML = "Update Task";
		buttonElem.innerHTML = "Update Task";
		inputElem.value = taskTitle;
		textareaElem.value = TaskDesc;
	}
	popupBox.classList.add("show");
}

function closePopUp() {
	popupBox.classList.remove("show");
	clearInput();
}

function taskDate() {
	let date = new Date();
	let month = date.getMonth();
	let day = date.getDate();
	let year = date.getFullYear();
	let weakNum = date.getDay();
	return `${months[month]} ${day}, ${year}(${days[weakNum]})`;
}

function setToLocalStorage(tasksArray) {
	localStorage.setItem("Items", JSON.stringify(tasksArray));
}

function clearInput() {
	inputElem.value = "";
	textareaElem.value = "";
}

addNewNoteBtn.addEventListener("click", () => {
	popUpFlag = true;
	showPopUp();
});
closeIcon.addEventListener("click", closePopUp);
buttonElem.addEventListener("click", addTask);
window.addEventListener("load", () => {
	let getFromLS = JSON.parse(localStorage.getItem("Items"));
	if (getFromLS) {
		tasks = getFromLS;
		generateTasks(tasks);
	}
});
window.addEventListener("keydown", (e) => {
	if (e.code === "Escape") {
		closePopUp();
	}
});
