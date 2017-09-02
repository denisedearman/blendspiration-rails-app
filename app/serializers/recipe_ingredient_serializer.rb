class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :unit
  belongs_to :ingredient
  belongs_to :recipe
end
