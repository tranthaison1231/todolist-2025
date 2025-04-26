let TODOS = [
  {
    id: 1,
    content: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    content: "Buy car",
    completed: true,
  },
  {
    id: 3,
    content: "Buy house",
    completed: false,
  },
  {
    id: 4,
    content: "Buy clock",
    completed: false,
  },
];

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");

function renderTodo(todo) {
  const todoItem = document.createElement("li");

  todoItem.setAttribute("data-id", todo.id);

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
      <input type="checkbox" ${
        todo.completed ? "checked" : ""
      } class="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500">
      <span class="ml-3 flex-1 text-gray-800">${todo.content}</span>
      <button class="text-gray-400 hover:text-red-500 transition-colors duration-200">
        <i class="fas fa-trash"></i>
      </button>
    `;

  todoList.appendChild(todoItem);
}

function renderTodoList(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    renderTodo(todo);
  });

  const activeTodos = todos.filter((todo) => !todo.completed);

  todoCount.innerHTML = `${activeTodos.length} items left`;
}

function addTodo() {
  if (todoInput.value === "") return;

  const todo = {
    id: TODOS.length + 1,
    content: todoInput.value,
    completed: false,
  };

  TODOS.push(todo);
  renderTodoList(TODOS);
  todoInput.value = "";
}

todoInput.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    todoButton.setAttribute("disabled", "true");
  } else {
    todoButton.removeAttribute("disabled");
  }
});

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
    const todoId = e.target.parentElement.parentElement.getAttribute("data-id");

    TODOS = TODOS.filter((todo) => todo.id !== Number(todoId));

    renderTodoList(TODOS);
  }
});

todoList.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    const todoId = e.target.parentElement.getAttribute("data-id");

    TODOS = TODOS.map((todo) => {
      if (todo.id === Number(todoId)) {
        todo.completed = e.target.checked;
      }
      return todo;
    });

    renderTodoList(TODOS);
  }
});

renderTodoList(TODOS);
