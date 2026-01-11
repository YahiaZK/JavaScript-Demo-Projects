// add todo

const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = [];

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    allTodos.push(todoText);
    insertTodo();
    todoInput.value = "";
  }
}

function insertTodo() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
          <input type="checkbox" id="todo-${todoIndex + 1}" />
          <label for="todo-${todoIndex + 1}" class="custom-checkbox">
            <span class="material-symbols-outlined"> check </span>
          </label>
          <label for="todo-${todoIndex + 1}" class="todo-text"> ${todo} </label>
          <button class="material-symbols-outlined delete-button">
            delete
          </button>
        `;

    todoListUL.append(todoLI);
  });
}

