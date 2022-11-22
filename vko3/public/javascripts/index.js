if (document.readyState !== "loading") {
  console.log("Document is ready");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready after waiting!");
    initializeCode();
  });
}

function initializeCode() {
  const submitDataButton = document.getElementById("submit-data");
  const searchButton = document.getElementById("search");
  const info = document.getElementById("info");
  const deleteUser = document.getElementById("delete-user");
  const nameSpace = document.getElementById("name");
  const todos = document.getElementById("todos");
  deleteUser.style.display = "none";
  let name;

  submitDataButton.addEventListener("click", () => {
    const inputName = document.getElementById("input-name");
    const inputTask = document.getElementById("input-task");

    fetch("http://localhost:3000/todo", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: `{ "user": "${inputName.value}",
            "task": "${inputTask.value}" }`,
    })
      .then((response) => response.json())
      .then((data) => {
        info.innerHTML = data;
      });
  });

  searchButton.addEventListener("click", () => {
    name = document.getElementById("search-name");

    fetch(`http://localhost:3000/user/${name.value}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          deleteUser.style.display = "block";
          nameSpace.innerHTML = data.name;
          todos.innerHTML = "";
          data.todos.forEach((t) => {
            let item = document.createElement("li");
            item.innerText = t;
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "delete";
            deleteButton.className = "delete-task";
            deleteButton.onclick = () => {
              item.remove();
              fetch(`http://localhost:3000/user`, {
                method: "put",
                headers: {
                  "Content-type": "application/json",
                },
                body: `{ "user": "${data.name}", "task": "${t}" }`,
              })
                .then((response) => response.json())
                .then((data) => {
                  info.innerHTML = data;
                });
            };

            item.appendChild(deleteButton);
            todos.appendChild(item);
          });
        } else {
          deleteUser.style.display = "none";
          nameSpace.innerHTML = data;
          todos.innerHTML = "";
        }
      });
  });

  deleteUser.addEventListener("click", () => {
    fetch(`http://localhost:3000/user/${name.value}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        deleteUser.style.display = "none";
        nameSpace.innerHTML = data;
        todos.innerHTML = "";
      });
  });
}

function deleteTask(name, task) {
  fetch(`http://localhost:3000/user`, {
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    body: `{ "user": "${name}",
      "task": "${task}" }`,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
