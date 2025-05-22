interface Todo {
  id?: number;
  content: string;
  completed: boolean;
}

let TODOS: Todo[] = [];

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");

const API_URL = "https://681a0d831ac1155635079c25.mockapi.io/todos";

async function getTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();

  if (todos) {
    TODOS = todos;
  }
  return TODOS;
}

async function removeTodo(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    TODOS = TODOS.filter((todo) => todo.id !== id);
    setTodos(TODOS);
  }
}

function setTodos(todos: Todo[]) {
  TODOS = todos;
  sessionStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodo(todo: Todo) {
  const todoItem = document.createElement("li");

  todoItem.setAttribute("data-id", todo.id!.toString());

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
      <div class="ml-3 flex-1 text-gray-800" contenteditable="true">${
        todo.content
      }</div>
      <button class="text-gray-400 hover:text-red-500 transition-colors duration-200">
        <i class="fas fa-trash"></i>
      </button>
    `;

  todoList?.appendChild(todoItem);
}

function renderTodoList(todos: Todo[]) {
  todoList!.innerHTML = "";
  todos.forEach((todo) => {
    renderTodo(todo);
  });

  const activeTodos = todos.filter((todo) => !todo.completed);

  todoCount!.innerHTML = `${activeTodos.length} items left`;
}

async function addTodo() {
  if (todoInput!.value === "") return;

  const todo = {
    id: TODOS.length + 1,
    content: todoInput!.value,
    completed: false,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (response.ok) {
    TODOS.push(todo);
    setTodos(TODOS);
    renderTodoList(TODOS);
    todoInput.value = "";
  }
}

async function updateTodo(id: number, newTodo: Todo) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  if (response.ok) {
    TODOS = TODOS.map((todo) => {
      if (todo.id === id) {
        return newTodo;
      }
      return todo;
    });
  }
}

todoInput.addEventListener("keyup", (e) => {
  if ((e.target as HTMLInputElement).value === "") {
    todoButton!.setAttribute("disabled", "true");
  } else {
    todoButton!.removeAttribute("disabled");
  }
});

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

todoButton!.addEventListener("click", () => {
  addTodo();
});

todoList!.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).tagName === "I") {
    const todoId = (
      e.target as HTMLElement
    ).parentElement!.parentElement!.getAttribute("data-id");

    const filteredTodos = TODOS.filter((todo) => todo.id !== Number(todoId));

    if (todoId) {
      removeTodo(Number(todoId));
      renderTodoList(filteredTodos);
    }
  }
});

todoList!.addEventListener("change", async (e) => {
  if ((e.target as HTMLInputElement).tagName === "INPUT") {
    const todoId = (e.target as HTMLInputElement).parentElement!.getAttribute(
      "data-id"
    );
    if (todoId) {
      await updateTodo(Number(todoId), {
        completed: (e.target as HTMLInputElement).checked,
        content: (e.target as HTMLInputElement).parentElement!.innerText,
      });

      renderTodoList(TODOS);
    }
  }
});

getTodos().then(() => {
  renderTodoList(TODOS);
});

// Browser: HTMl, CSS, JS
