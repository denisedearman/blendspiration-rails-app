class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :create, :update]
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
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to recipes_path
    else
      redirect_to new_recipe_path
    end

  end

  def new
    @recipe = Recipe.new
  end

  def edit
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      redirect_to edit_recipe_path(@recipe)
    end
  end


  private
  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :description, :user_id, recipe_ingredients_attributes: [:quantity, :unit, :ingredient_id])
  end
end
