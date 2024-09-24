let mainTodoElem = document.querySelector(".todo-lists-elem");
let inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

let localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  let divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li> ${curElem} </li>
        <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValue.value.trim();

  inputValue.value = "";

  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoLists));
    addTodoDynamicElement(todoListValue);
  }
};

const updateTodoListLocalStorage = (localTodoLists) => {
  return localStorage.setItem(
    "youtubeTodoList",
    JSON.stringify(localTodoLists)
  );
};

const removeTodo = (e) => {
  e.preventDefault();
  const todoToRemove = e.target;
  let todoContentToDelete = todoToRemove.previousElementSibling.innerText;
  // console.log(todoContentToDelete);
  // console.log(e.target);
  let parentElem = todoToRemove.parentElement;
  // console.log(parentElem);
  localTodoLists = localTodoLists.filter((curTodo) => {
    return curTodo !== todoContentToDelete;
  });

  updateTodoListLocalStorage(localTodoLists);
//   console.log(todoContentToDelete);
  parentElem.remove();
};

const showTodoList = () => {
  //   console.log(localTodoLists);
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

mainTodoElem.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    removeTodo(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
