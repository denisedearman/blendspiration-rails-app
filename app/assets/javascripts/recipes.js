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
  this.recipe_ingredients  = attributes.recipe_ingredients
}

$(function(){
  Recipe.templateSource = $("#recipe-template").html();
  Recipe.template = Handlebars.compile(Recipe.templateSource);
})

Recipe.prototype.renderRecipe = function(){
  return Recipe.template(this)
}

function addBackgroundPhoto(){
  document.getElementById("blueberry").style.visibility = "visible";
  $("#text-white").text("Welcome to Blendspiration");
  $("#mainTitle").text("");
  $("#mainContent").text("");
}

function createRecipe(){
  var name = document.getElementById("recipe_name").value;
  var description = document.getElementById("recipe_description").value;
  var recipe_ingredients = {};
  for(var i = 0; i < 10; i++){
    var quantity = document.getElementById(`recipe_recipe_ingredients_attributes_${i}_quantity`).value;
    var unit = document.getElementById(`recipe_recipe_ingredients_attributes_${i}_unit`).value;
    var ingredient_id = document.getElementById(`recipe_recipe_ingredients_attributes_${i}_ingredient_id`).value;
    recipe_ingredients[i.toString()] = {quantity: quantity, unit: unit, ingredient_id: ingredient_id}
  }
  params = {
    recipe:{
            name: name,
            description: description,
            recipe_ingredients_attributes: recipe_ingredients
            }
          };
  $.ajax({
    url: '/recipes',
    data: params,
    dataType: "json",
    method: "POST"
  })
  .success(function(json){
    var recipe = new Recipe(json);
    if(!$("#addedRecipes").length){
      $("#mainContent").append(`<h4 id="addedRecipes">Added Recipes</h4>`)
    }
    $("#mainContent").append(recipe.renderRecipe())
  })
}

function displayRecipeForm(){
  removeBackgroundPhoto();
  var createRecipeTemplate = Handlebars.compile($("#recipe-form-template").html());
  $.get('/ingredients', function(data) {
     var ingredientsList = data;
     $("#mainTitle").text("Create Recipe");
     var templateData = {'submitAction': 'createRecipe()', 'ingredients': ingredientsList, 'recipe_ingredients': [{id: 0},{id: 1},{id: 2}, {id: 3}, {id: 4}, {id: 5},{id: 6}, {id: 7}, {id: 8}, {id: 9}]};
     $("#mainContent").html(createRecipeTemplate(templateData));
  })
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
    $("#mainContent").html('<ul class="recipeList"></ul><button id="simpleRecipes" class="btn btn-success">View Simple Recipes</button>');
    $('#simpleRecipes').on('click', function(){
      displaySimpleRecipesIndex();
    })
    recipes.forEach(displayRecipeItem);
  });
}

function displaySimpleRecipesIndex(){
  removeBackgroundPhoto();
  $("#mainTitle").text("Simple Recipes - 3 Ingredients or Less!");
  $.get('/recipes/simple-recipes', function(data) {
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
    var recipe = new Recipe(data);
    $("#mainTitle").text("");
    $("#mainContent").text("");
    $("#mainContent").append(recipe.renderRecipe())
    $("#mainContent").append(`<button id="recipe-next">Next</button>`)
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
