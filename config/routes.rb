Rails.application.routes.draw do
  resources :ingredients, only:[:index, :show, :new, :create]
  resources :recipes
  root 'welcome#home'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :users, only:[] do
    resources :recipes, only:[:index, :show, :new, :edit]
  end
end
