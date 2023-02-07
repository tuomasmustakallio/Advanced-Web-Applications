if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    document.getElementById("list").addEventListener("click", listOfUsers);
    document.getElementById("logout").addEventListener("click", logout);
}

function listOfUsers(event) {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) return;

    fetch("/users/list", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
        .then((response) => response.text())
        .then((page) => {
            document.getElementById("content").innerHTML = page;
        })
        .catch((e) => {
            console.log("error" + e);
        })

}

function logout(){
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}