class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :unit, :ingredient, :recipe
end
