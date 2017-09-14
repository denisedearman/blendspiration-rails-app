class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def simple
    @recipes = Recipe.simple_recipes
  end

  def search
    @recipes = Recipe.all.select{|recipe| recipe.name.downcase.include?(params[:search_terms].downcase)}
    render 'index'
  end

  def index
    if params[:user_id]
      if current_user
        @recipes = current_user.recipes
      else
        redirect_to recipes_path, alert: "Could not find user"
      end
    else
      @recipes = Recipe.ordered_all
    end
  end

  def create
    @recipe = current_user.recipes.build(recipe_params)
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
  end


  private
  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :description, recipe_ingredients_attributes: [:quantity, :unit, :ingredient_id])
  end
end
