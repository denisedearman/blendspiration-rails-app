function Ingredient(attributes){
  this.id = attributes.id
  this.name = attributes.name
}

$(function(){
  Ingredient.templateSource = $("#ingredient-template").html();
  Ingredient.template = Handlebars.compile(Ingredient.templateSource);
})

Ingredient.prototype.renderLI = function(){
  return Ingredient.template(this)
}

function displayIngredientsIndex(){
  removeBackgroundPhoto();
  $("#mainTitle").text("Ingredients");
  $.get('/ingredients', function(data) {
    var ingredients = data;
    $("#mainContent").html('<p><button class= "btn btn-success" id="newIngredient">Create Ingredient</button></p><ul class="ingredientList"></ul>');
    $('#newIngredient').on('click', function(){
      displayIngredientForm();
    })
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

function displayIngredientForm(){
  debugger;
  removeBackgroundPhoto();
  var createIngredientTemplate = Handlebars.compile(document.getElementById("ingredient-form-template").innerHTML);
  $("#mainTitle").text("Create Ingredient");
  $("#mainContent").html(createIngredientTemplate({'submitAction': 'createIngredient()'}));
}


function createIngredient(){
  var name = document.getElementById("name").value;
  params = {name: name};
  $.ajax({
    url: '/ingredients',
    data: params,
    dataType: "json",
    method: "POST"
  })
  .success(function(json){
    var ingredient = new Ingredient(json);
    displayIngredientsIndex();
  })
}
