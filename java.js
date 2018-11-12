var apiKey ="4557d5baf88f1df7f71e09570588b1cf63b66494438bdf7d9217a1f683be64d0";

// Load existing TodDos and display them
var listRequest =  new XMLHttpRequest();
	listRequest.onreadystatechange = function() {
		// wait for readyState = 4 && 200 response
		 if (this.readyState == 4 && this.status == 200) {
			  var loadToDos=(JSON.parse(this.responseText));
				console.log(JSON.parse(this.responseText));
				// display ToDos on page
				for (var i=0; i<loadToDos.length; i++){
					const element = loadToDos[i];
					renderTodos(element);
				}
		 }
		 else if (this.readyState == 4) {
			 // this.status !==200 then error from server
			  console.log(this.responseText);
		 }
	}
listRequest.open("GET","https://api.kraigh.net/todos",true);
listRequest.setRequestHeader("x-api-key", apiKey);
listRequest.send();




// Handle new Todo form submit
document.getElementById("navform").addEventListener("submit",function(event){
	event.preventDefault();
	// submit to API
	var data = {
		text: form.value
	}
		// this is the ajax
				var createRequest = new XMLHttpRequest();
					createRequest.onreadystatechange = function() {
						// wait for readyState = 4 && 200 response
					   if (this.readyState == 4 && this.status == 200) {
							 // parse JSON response
					       var todo = JSON.parse(this.responseText);
					       renderTodos(todo);
					   }
						 else if (this.readyState == 4) {
							 // this.status !==200 then error from server
					           console.log(this.responseText);
					   }
					};
				createRequest.open("POST","https://api.kraigh.net/todos");
				createRequest.setRequestHeader("Content-Type","application/json");
				createRequest.setRequestHeader("x-api-key", apiKey);
				createRequest.send(JSON.stringify(data));
	});

// function to write todos to the page that receives an object in ajax form from the server
function renderTodos(todoData){
	// creates a listItem and acts like a todo container. Sets an id with the API and its given a class
	var listItem=document.createElement("li");
	listItem.setAttribute("id",todoData.id);
	listItem.classList.add("todo");
	if(todoData.completed==true){
		listItem.classList.add("completed");
	}
	// creates a complete button in the form of a checkbox with check class
	var checkBox=document.createElement("input");
	checkBox.type="checkbox";
	checkBox.classList.add("check");
	listItem.appendChild(checkBox);
	// add todo text
	var label=document.createElement("label");
	label.innerText = todoData.text;
	listItem.appendChild(label);
	// creates a delete button
	var deleteButton=document.createElement("button");
	deleteButton.classList.add("delete");
	deleteButton.innerText="Remove";
	listItem.appendChild(deleteButton);
	// adds the listitem to the list and displays it on the website
	document.getElementById("tasks").appendChild(listItem);
	// triggers a function to complete or delete the listItem
  checkBox.addEventListener("click", completeTodo);
	deleteButton.addEventListener("click", deleteTodo);
	// clears the form
	document.getElementById("form").value='';
}

function completeTodo(event){
	var todoId = event.target.parentNode.id;
	var data ={completed: true};
	var completeRequest = new XMLHttpRequest();
		completeRequest.onreadystatechange = function() {
			 if (this.readyState == 4 && this.status == 200) {
					 event.target.parentNode.classList.add("completed");
			 }
			 else if (this.readyState == 4) {
							 console.log(this.responseText);
			 }
		}
	completeRequest.open("PUT","https://api.kraigh.net/todos/" + todoId, true);
	completeRequest.setRequestHeader("Content-Type","application/json");
	completeRequest.setRequestHeader("x-api-key", apiKey);
	completeRequest.send(JSON.stringify(data));
}

function deleteTodo(event){
	var todoId = event.target.parentNode.id;
	var data ={completed: true};
	var deleteRequest = new XMLHttpRequest();
		deleteRequest.onreadystatechange = function() {
			 if (this.readyState == 4 && this.status == 200) {
					 event.target.parentNode.remove();
			 }
			 else if (this.readyState == 4) {
							 console.log(this.responseText);
			 }
		}
	deleteRequest.open("DELETE","https://api.kraigh.net/todos/" + todoId, true);
	deleteRequest.setRequestHeader("Content-Type","application/json");
	deleteRequest.setRequestHeader("x-api-key", apiKey);
	deleteRequest.send();
}
