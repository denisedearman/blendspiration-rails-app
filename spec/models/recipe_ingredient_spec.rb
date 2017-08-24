require 'rails_helper'

RSpec.describe RecipeIngredient, type: :model do
  before(:each) do
    @recipe = Recipe.first
    @ingredient = Ingredient.first
    @recipe_ingredient = RecipeIngredient.create(recipe: @recipe, ingredient: @ingredient)
  end

  it "belongs to recipe" do
    expect(@recipe_ingredient.recipe).to eq(@recipe)
  end

  it "belongs to ingredient" do
    expect(@recipe_ingredient.ingredient).to eq(@ingredient)
  end

end
