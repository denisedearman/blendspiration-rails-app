FactoryGirl.define do
  factory :recipe_ingredient do
    recipe_id 1
    ingredient_id 1
    quantity "9.99"
    unit "MyString"
  end
end
