import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const selectedBreeds = ["bluetick", "hound", "dingo", "tervuren", "malinois"];
  selectedBreeds.forEach(async (breed) => {
    const current = document.getElementById("app");

    //Render item container
    const itemDiv = document.createElement("div");
    itemDiv.className = "wiki-item";
    current.appendChild(itemDiv);

    //Render header
    const header = document.createElement("h1");
    header.className = "wiki-header";
    header.innerHTML = breed;
    itemDiv.appendChild(header);

    //Render content container
    const contentDiv = document.createElement("div");
    contentDiv.className = "wiki-content";
    itemDiv.appendChild(contentDiv);

    //Render description
    const text = document.createElement("p");
    text.className = "wiki-text";
    text.innerHTML = await loadDescription(breed);
    contentDiv.appendChild(text);

    //Render image container
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    contentDiv.appendChild(imgContainer);

    //Render image
    const img = document.createElement("img");
    img.className = "wiki-img";
    img.src = await loadImg(breed);
    imgContainer.appendChild(img);
  });
}

//Fetch image of given breed
async function loadImg(breed) {
  let url = `https://dog.ceo/api/breed/${breed}/images/random`;
  let res = await fetch(url);
  let breedImg = await res.json();
  return breedImg.message;
}

//Fetch description of given breed
async function loadDescription(breed) {
  let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`;
  let res = await fetch(url);
  let description = await res.json();
  return description.extract;
}
