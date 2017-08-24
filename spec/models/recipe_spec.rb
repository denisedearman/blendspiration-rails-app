require 'rails_helper'

RSpec.describe Recipe, type: :model do
  before(:each) do
    @user = User.first
    @recipe = @user.recipes.create(name: "BB Smoothie", description: "Blend")
  end

  it "belongs to user" do
    expect(@recipe.user).to eq(@user)
  end

end
