require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  before(:each) do
    @ingredient = Ingredient.create(name: "Apple")
    @recipe = Recipe.create(user: User.first, name: "Apple Pie")
  end

  it "has many recipe ingredients" do
    @ingredient.recipe_ingredients.create(recipe: @recipe, quantity: 1, unit: "tbs")
    expect(@ingredient.recipe_ingredients.count).to eq(1)
  end

  it "has many recipes through recipe ingredients" do
    @ingredient.recipe_ingredients.create(recipe: @recipe, quantity: 1, unit: "tbs")
    expect(@ingredient.recipes.count).to eq(1)
  end

end
