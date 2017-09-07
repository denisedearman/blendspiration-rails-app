class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
  @unit_values = [
    'tbs',
    'tsp',
    'cups',
    'quarts',
    'pints',
    'grams',
    'pounds',
    'units'
  ]
  validates :quantity, numericality: {greater_than: 0}, presence: true
  validates :unit, inclusion: {:in => @unit_values}
end
