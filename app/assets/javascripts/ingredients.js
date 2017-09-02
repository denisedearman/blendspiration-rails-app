function displayIngredientsIndex(){
  removeBackgroundPhoto();
  $("#mainTitle").text("Ingredients");
  $.get('/ingredients', function(data) {
    var ingredients = data;
    $("#mainContent").html('<ul class="ingredientList"></ul>');
    ingredients.forEach(displayIngredientItem);
  });
}

function displayIngredientItem(ingredient){
  $("#mainContent ul").append(`<li><button id="ingredientId-${ingredient.id}">${ingredient.name}</button></li>`);
  $("#ingredientId-" + ingredient.id).on('click', function(){
    loadIngredient(ingredient.id);
  });
}

function loadIngredient(ingredient_id){
  $.get('/ingredients/' + ingredient_id, function(data){
    var ingredient = data;
    $("#mainTitle").text(ingredient.name)
    $("#mainContent").html('<ul></ul><button id="ingredient-next">Next</button>')
    ingredient.recipes.forEach(displayRecipeItem)
    $('#ingredient-next').on('click', function(){
      loadRecipe(ingredient.id + 1);
    })
  })
}
