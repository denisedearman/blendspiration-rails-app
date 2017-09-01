class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def simple
    @recipes = Recipe.simple_recipes
  end

  def index
    if params[:user_id] && current_user
      @recipes = current_user.recipes
    else
      @recipes = Recipe.ordered_all
    end
    render json: @recipes
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to recipes_path
    else
      render 'new'
    end

  end

  def new
    @recipe = Recipe.new
  end

  def edit
    if current_user != @recipe.user
      redirect_to @recipe
    end
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      redirect_to edit_recipe_path(@recipe)
    end
  end

  def destroy
    @recipe.destroy
    redirect_to recipes_path
  end


  def show
    render json: @recipe
  end


  private
  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :description, :user_id, recipe_ingredients_attributes: [:quantity, :unit, :ingredient_id])
  end
end
