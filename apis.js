let baseUrl = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks";
let studentId = "2597426";
let apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";

const init = () => {

	getAllTasks();
	document.querySelector("#newTask").addEventListener("click", addNewTask);

}

const addNewTask = () => {
	console.log("adding a new task...");

	let xhr = new XMLHttpRequest();
	let taskDescription = document.querySelector("#task").value;
	let params = {
		'StudentId': studentId,
		'Description': taskDescription
	};

	xhr.open("post", baseUrl);

	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("x-api-key", apiKey);

	xhr.onreadystatechange = () => {
		if(xhr.readyState === 4) {

			console.log("new record was added....");

			let tasks = document.querySelector("#tasks");
			let task = document.createElement("li");
			task.setAttribute("data-description", taskDescription);
			task.setAttribute("class", "delete list-group-item");
			task.innerHTML = taskDescription;
			tasks.appendChild(task);

			task.addEventListener("click", deleteTask);

		}

	}

	xhr.send(JSON.stringify(params));
}

const getAllTasks = () => {
	console.log("getting all tasks...");

	let xhr = new XMLHttpRequest();
	let url = `${baseUrl}/${studentId}`;

	xhr.open("get", url);
	xhr.setRequestHeader("x-api-key", apiKey);

	xhr.onreadystatechange = () => {
		if(xhr.readyState === 4) {
			let results = JSON.parse(xhr.responseText);

			let tasksExists = document.querySelector("#tasks");

			if (tasksExists) {
				tasksExists.remove();
			}

			let tasks = document.createElement("ul");
			tasks.setAttribute("id", "tasks");
			tasks.setAttribute("class", "list-group");

			for(let i = 0; i < results.Items.length; i++) {
				console.log(results.Items[i].Description);
				let taskDescription = results.Items[i].Description;
				let task = document.createElement("li");
				task.setAttribute("data-description", taskDescription);
				task.setAttribute("class", "delete list-group-item");
				task.innerHTML = taskDescription;
				tasks.appendChild(task);

				task.addEventListener("click", deleteTask);

			}

			document.querySelector(".taskList").appendChild(tasks);

		}
	}

	xhr.send(null);


}

const deleteTask = event => {
	console.log("deleting task...");

	let xhr = new XMLHttpRequest();
	let taskDescription = event.currentTarget.getAttribute("data-description");
	let params = {
		'StudentId': studentId,
		'Description': taskDescription
	};
	console.log(taskDescription);
	event.currentTarget.remove();

	xhr.open("delete", baseUrl);

	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("x-api-key", apiKey);

	xhr.onreadystatechange = () => {
		if(xhr.readyState === 4) {
			console.log("event removed");
		}
	}

	xhr.send(JSON.stringify(params));
}


window.onload = init;
