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
end
