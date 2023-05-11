Rails.application.routes.draw do
  resources :cards
  resources :lists
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "lists#index"
end
