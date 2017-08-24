class Recipe < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  validates :name, uniqueness: true, presence: true


  def recipe_ingredients_attributes=(recipe_ingredient_attributes)
    recipe_ingredient_attributes.values.each do |recipe_ingredient_attribute|
      binding.pry
      recipe_ingredient = RecipeIngredient.find_or_create_by(recipe_ingredient_attribute)
      self.recipe_ingredients << recipe_ingredient
    end
  end
end
