class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  belongs_to :user
  has_many :recipe_ingredients
end
