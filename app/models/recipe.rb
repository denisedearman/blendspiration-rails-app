class Recipe < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  validates :name, uniqueness: true, presence: true


  def recipe_ingredients_attributes=(recipe_ingredient_attributes)
    self.recipe_ingredients.clear
    recipe_ingredient_attributes.values.each do |recipe_ingredient_attribute|
      if recipe_ingredient_attribute[:quantity] && recipe_ingredient_attribute[:quantity].to_f > 0
        recipe_ingredient = RecipeIngredient.find_or_create_by(recipe_ingredient_attribute)
        self.recipe_ingredients << recipe_ingredient
      end
    end
  end

  def self.simple_recipes
    all.joins(:recipe_ingredients).having('COUNT(ingredient_id) < 4').group('recipe_id')
  end

  def self.ordered_all
    self.all.order(:name)
  end

  def self.next_id(current_id)
    all.where('id > ' + current_id.to_s).order('id ASC').limit(1)
  end


end
