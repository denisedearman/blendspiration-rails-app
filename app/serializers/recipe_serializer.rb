class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user
  has_many :recipe_ingredients
end
