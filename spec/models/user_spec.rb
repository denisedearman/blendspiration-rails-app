require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user = User.first
  end

  it "has many recipes" do
    @user.recipes.create
    expect(@user.recipes.count).to eq(1)
  end

end
