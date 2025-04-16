const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");

function addTodo() {
  const todoItem = document.createElement("li");

  todoItem.classList.add(
    "flex",
    "items-center",
    "px-6",
    "py-4",
    "hover:bg-gray-50",
    "group",
    "transition-colors",
    "duration-150"
  );

  todoItem.innerHTML = `
      <input type="checkbox" class="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500">
      <span class="ml-3 flex-1 text-gray-800">${todoInput.value}</span>
      <button class="text-gray-400 hover:text-red-500 transition-colors duration-200">
        <i class="fas fa-trash"></i>
      </button>
    `;

  todoList.appendChild(todoItem);

  const todoLength = todoList.children.length;
  todoCount.innerHTML = `${todoLength} items left`;

  todoInput.value = "";
}

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

todoButton.addEventListener("click", () => {
  addTodo();
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    e.target.parentElement.parentElement.remove();
  }
});

todoList.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    let count = 0;

    for (let i = 0; i < todoList.children.length; i++) {
      if (!todoList.children[i].firstElementChild.checked) {
        count++;
      }
    }

    todoCount.innerHTML = `${count} items left`;
  }
});
