$(document).ready(function(){
  attachListeners();
})


function attachListeners(){
  $('#recipeIndex').on('click', function(){
    displayRecipesIndex();
  });
}

function addBackgroundPhoto(){
  document.getElementById("blueberry").style.visibility = "visible";
  $("#text-white").text("Welcome to Blendspiration");
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

function loadRecipe(recipe_id){
  $.get('/recipes/' + recipe_id, function(data){
    var recipe = data;
    $("#mainTitle").text(recipe.name)
    $("#mainContent").text(recipe.description)
  })
}



function removeBackgroundPhoto(){
  document.getElementById("blueberry").style.visibility = "hidden";
  $("#text-white").text("");
}
