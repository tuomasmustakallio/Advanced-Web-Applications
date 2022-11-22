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
  const chosenRecipe = "pizza";

  //Fetch recipe
  let data = await getRecipe(chosenRecipe);

  //Item container
  let recipeItem = document.createElement("div");

  //Recipe name
  let name = document.createElement("h1");
  name.innerHTML = data.name;
  recipeItem.appendChild(name);

  //Ingredients
  let ingredientsHeader = document.createElement("h2");
  ingredientsHeader.innerHTML = "Ingredients";
  recipeItem.appendChild(ingredientsHeader);
  let ingredients = document.createElement("p");
  ingredients.innerHTML = data.ingredients;
  recipeItem.appendChild(ingredients);

  //Instructions
  let instructionsHeader = document.createElement("h2");
  instructionsHeader.innerHTML = "Instructions";
  recipeItem.appendChild(instructionsHeader);
  let instructions = document.createElement("p");
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
    let addedRecipe = await postRecipe(curRecipe);
    name.innerHTML = addedRecipe.name;
    ingredients.innerHTML = addedRecipe.ingredients;
    instructions.innerHTML = addedRecipe.instructions;

    //Source: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    const formData = new FormData();
    for (const file of imgInput.files) {
      formData.append("images", file);
    }
    await sendImgs(formData);
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
