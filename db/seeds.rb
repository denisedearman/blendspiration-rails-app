
user = FactoryGirl.build(:user)
user.email = "user@gmail.com"
user.password = "12345678"
user.save
