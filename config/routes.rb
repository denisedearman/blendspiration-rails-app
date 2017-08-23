Rails.application.routes.draw do
  root 'welcome#home'
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
end
