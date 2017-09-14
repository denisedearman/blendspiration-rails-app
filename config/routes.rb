Rails.application.routes.draw do
  resources :ingredients, only:[:index, :show, :new, :create]
  get '/recipes/simple-recipes' => 'recipes#simple'
  get '/recipes/search-results' => 'recipes#search'
  resources :recipes
  resources :recipe_ingredients, only:[:create, :update]
  root 'welcome#home'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users, only:[] do
    resources :recipes, only:[:index, :show, :new, :edit]
  end
end
