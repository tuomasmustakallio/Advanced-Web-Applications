if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {
    const submitDataButton = document.getElementById("submit-data");

    submitDataButton.addEventListener("click", () => {
        const input = document.getElementById("input-text");

        fetch("http://localhost:3000/list", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: `{ "text": "${input.value}" }`
           })
           .then(response => response.json())
           .then(data => {
               console.log(data.list);
           })

    })
}