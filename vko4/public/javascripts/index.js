if (document.readyState !== "loading") {
  console.log("Document is ready");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready after waiting!");
    initializeCode();
  });
}

let curRecipe = {
  name: "",
  instructions: [],
  ingredients: [],
  categories: [],
  images: [],
};

async function initializeCode() {
  const recipeList = document.getElementById("recipe-list");
  const addIngredientBtn = document.getElementById("add-ingredient");
  const curIngredient = document.getElementById("ingredients-text");
  const addInstructionBtn = document.getElementById("add-instruction");
  const curInstructions = document.getElementById("instructions-text");
  const curName = document.getElementById("name-text");
  const submitBtn = document.getElementById("submit");
  const imgInput = document.getElementById("image-input");
  const categoryList = document.getElementById("category-list");
  const chosenRecipe = "pizza";

  const categories = await getCategories();
  for (const category of categories) {
    let categoryItem = document.createElement("label");
    categoryItem.id = category.name + "label";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = category.name;
    checkbox.value = category._id;
    let text = document.createElement("span");
    text.id = category.name + "-span";
    text.htmlFor = category.name;
    text.appendChild(document.createTextNode(category.name));
    categoryItem.appendChild(checkbox);
    categoryItem.appendChild(text);
    categoryList.appendChild(categoryItem);
  }

  //Fetch recipe
  let data = await getRecipe(chosenRecipe);

  //Item container
  let recipeItem = document.createElement("div");

  //Recipe name
  let name = document.createElement("h1");
  name.innerHTML = data.name;
  name.id = "name";
  recipeItem.appendChild(name);

  //Ingredients
  let ingredientsHeader = document.createElement("h2");
  ingredientsHeader.innerHTML = "Ingredients";
  recipeItem.appendChild(ingredientsHeader);
  let ingredients = document.createElement("p");
  ingredients.id = "ingredients";
  ingredients.innerHTML = data.ingredients;
  recipeItem.appendChild(ingredients);

  //Instructions
  let instructionsHeader = document.createElement("h2");
  instructionsHeader.innerHTML = "Instructions";
  recipeItem.appendChild(instructionsHeader);
  let instructions = document.createElement("p");
  instructions.id = "instructions";
  instructions.innerHTML = data.instructions;
  recipeItem.appendChild(instructions);

  //Add to the list
  recipeList.appendChild(recipeItem);

  //Add ingredient to current recipe
  addIngredientBtn.addEventListener("click", () => {
    curRecipe.ingredients.push(curIngredient.value);
  });

  //Add instruction to current recipe
  addInstructionBtn.addEventListener("click", () => {
    curRecipe.instructions.push(curInstructions.value);
  });
  //On submit post the current recipe to server
  submitBtn.addEventListener("click", async () => {
    curRecipe.name = curName.value;

    for (const category of categories) {
      const box = document.getElementById(category.name);
      if (box.checked) {
        curRecipe.categories.push(category._id);
      }
    }

    //Source: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    const formData = new FormData();
    for (const file of imgInput.files) {
      formData.set("name");
      formData.set("images", file);
    }
    let addedImg = await sendImgs(formData);
    curRecipe.images = addedImg._id;

    let addedRecipe = await postRecipe(curRecipe);
    name.innerHTML = addedRecipe.name;
    ingredients.innerHTML = addedRecipe.ingredients;
    instructions.innerHTML = addedRecipe.instructions;
  });
}

async function getRecipe(chosenRecipe) {
  let url = `http://localhost:3000/recipe/${chosenRecipe}`;
  return await fetch(url, { method: "get" }).then(
    async (res) => await res.json()
  );
}

async function postRecipe(curRecipe) {
  let url = `http://localhost:3000/recipe/`;
  return await fetch(url, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(curRecipe),
  }).then(async (res) => await res.json());
}

async function sendImgs(formData) {
  let url = `http://localhost:3000/images`;
  await fetch(url, {
    method: "post",
    headers: {
      "Content-type": "multipart/form-data",
    },
    body: formData,
  }).then(async (res) => await res.json());
}

async function search(recipe) {
  const curIngredient = document.getElementById("ingredients");
  const curInstructions = document.getElementById("instructions");
  const curName = document.getElementById("name");
  if (event.key === "Enter") {
    data = await getRecipe(recipe.value);
    console.log(data);
    curName.innerHTML = data.name;
    curIngredient.innerHTML = data.ingredients;
    curInstructions.innerHTML = data.instructions;
  }
}

async function getCategories() {
  let url = `http://localhost:3000/category`;
  return await fetch(url, { method: "get" }).then(
    async (res) => await res.json()
  );
}
