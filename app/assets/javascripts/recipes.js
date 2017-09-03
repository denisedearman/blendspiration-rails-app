$(document).ready(function(){
  attachListeners();
})


function attachListeners(){
  $('#blendspiration').on('click', function(){
    setHomePage();
  })
  $('#createRecipe').on('click', function(){
    displayRecipeForm();
  })
  $('#recipeIndex').on('click', function(){
    displayRecipesIndex();
  });
  $('#ingredientIndex').on('click', function(){
    displayIngredientsIndex();
  })
  $('#userRecipesIndex').on('click', function(){
    displayUserRecipesIndex();
  })
}

function Recipe(attributes){
  this.id = attributes.id
  this.name = attributes.name
  this.description = attributes.description
  this.user = attributes.user
  this.recipe_ingredients  = attrbutes.recipe_ingredients
}

function addBackgroundPhoto(){
  document.getElementById("blueberry").style.visibility = "visible";
  $("#text-white").text("Welcome to Blendspiration");
  $("#mainTitle").text("");
  $("#mainContent").text("");
}

function createRecipe(){
  alert("Create Recipe");
}

function displayRecipeForm(){
  debugger;
  removeBackgroundPhoto();
  var createRecipeTemplate = Handlebars.compile($("#recipe-form-template").html());
  $.get('/ingredients', function(data) {
     var ingredientsList = data;
     $("#mainTitle").text("Create Recipe");
     var templateData = {'submitAction': 'createRecipe()', 'ingredients': ingredientsList};
     $("#mainContent").html(createRecipeTemplate(templateData));
  })
}



function displayRecipeIngredient(recipe_ingredient){
  $("#mainContent ul").append(`<li> ${recipe_ingredient.ingredient.name} ${recipe_ingredient.quantity} ${recipe_ingredient.unit}`);
}


function displayRecipeItem(recipe){
  $("#mainContent ul").append(`<li><button id="recipeid-${recipe.id}">${recipe.name} - ${recipe.user.email}</button></li>`);
  $("#recipeid-" + recipe.id).on('click', function(){
    loadRecipe(recipe.id);
  });
}

function displayRecipesIndex(){
  removeBackgroundPhoto();
  $("#mainTitle").text("Recipes");
  $.get('/recipes', function(data) {
    var recipes = data;
    $("#mainContent").html('<ul class="recipeList"></ul>');
    recipes.forEach(displayRecipeItem);
  });
}

function displayUserRecipesIndex(){
  removeBackgroundPhoto();
  var user_id = $("#userId").text();
  $("#mainTitle").text("Recipes");
  $.get(`/users/${user_id}/recipes`, function(data) {
    var recipes = data;
    $("#mainContent").html('<ul class="recipeList"></ul>');
    recipes.forEach(displayRecipeItem);
  });
}

function loadRecipe(recipe_id){
  $.get('/recipes/' + recipe_id, function(data){
    var recipe = data;
    $("#mainTitle").text(recipe.name)
    $("#mainContent").html('<h3></h3><ul></ul><p></p><button id="recipe-next">Next</button>')
    recipe.recipe_ingredients.forEach(displayRecipeIngredient)
    $("#mainContent h3").text(recipe.user.email)
    $("#mainContent p").text(recipe.description)
    $('#recipe-next').on('click', function(){
      loadRecipe(recipe.id + 1);
    })
  })
}

function removeBackgroundPhoto(){
  document.getElementById("blueberry").style.visibility = "hidden";
  $("#text-white").text("");
}

function setHomePage(){
  addBackgroundPhoto();
}
