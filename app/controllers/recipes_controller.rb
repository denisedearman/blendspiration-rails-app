class RecipesController < ApplicationController
  def index
    if params[:user_id]
      user = User.find_by(params[:user_id])
      if user
        @recipes = user.recipes
      else
        redirect_to recipes_path, alert: "Could not find user"
      end
    else
      @recipes = Recipe.all
    end
  end

  def create

  end

  def new
    @recipe = Recipe.new
    @ingredients = Ingredient.all
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :description, recipe_ingredients_attributes: [:quantity, :unit, :ingredient_id])
end
