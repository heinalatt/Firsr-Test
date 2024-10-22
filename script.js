document.addEventListener('DOMContentLoaded' , () => {
	const taskList = document.getElementById('task-list');
	const addTaskBtn = document.getElementById('add-task-btn');
	const newTaskInput = document.getElementById('new-task');

	loadTasks();

	addTaskBtn.addEventListener('click' , addTask);
	newTaskInput.addEventListener('keyPress' , function(event) {
		if (event.key === "Enter") addTask();

	});

	function addTask() {
		const taskText = newTaskInput.value.trim();
		if (taskText === '') return;

		const taskItem = document.createElement("li");
		taskItem.textContent = taskText;

		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = 'Delete';
		deleteBtn.addEventListener('click' , deleteTask);

		taskItem.appendChild(deleteBtn);
		taskItem.addEventListener('click' , toggleTaskCompetion);
		taskList.appendChild(taskItem);

		saveTasks();
		newTaskInput.value = '';
	}

	function deleteTask(event) {
		event.target.parentElement.remove();
		saveTasks();
	}

	function toggleTaskCompetion(event) {
		if (event.target.tagName === 'BUTTON') return;
		event.target.classList.toggle('completed');
		saveTasks();
	}

	function saveTasks(argument) {
		const tasks = [];
		taskList.querySelectorAll('li').forEach(taskItem => {
			task.push({
				 text: taskItem.textContent.replace('Delete', '').trim(),
				 completed: taskItem.classList.contains('completed')
			});
		});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.text;
      if (task.completed) taskItem.classList.add('completed');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', deleteTask);

      taskItem.appendChild(deleteBtn);
      taskItem.addEventListener('click', toggleTaskCompletion);
      taskList.appendChild(taskItem);
    });
  }

});