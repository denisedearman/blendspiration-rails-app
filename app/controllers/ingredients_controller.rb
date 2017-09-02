class IngredientsController < ApplicationController

  def new
    @ingredient = Ingredient.new
  end

  def create
    @ingredient = Ingredient.new(ingredient_params)
    if @ingredient.save
      redirect_to ingredients_path
    else
      render :new
    end
  end

  def show
    @ingredient = Ingredient.find(params[:id])
    render json: @ingredient
  end

  def index
    @ingredients = Ingredient.ordered_all
    render json: @ingredients
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name)
  end
end
