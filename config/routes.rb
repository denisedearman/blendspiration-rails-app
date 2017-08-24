Rails.application.routes.draw do
  resources :ingredients
  resources :recipe_ingredients
  resources :recipes
  root 'welcome#home'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
end
