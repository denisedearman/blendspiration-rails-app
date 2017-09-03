class IngredientsController < ApplicationController

  def new
    @ingredient = Ingredient.new
  end

  def create
    @ingredient = Ingredient.create(ingredient_params)
    render json: @ingredient, status: 201
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
    params.permit(:name)
  end
end
