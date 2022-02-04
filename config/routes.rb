Rails.application.routes.draw do

  get 'sessions/create'
  get 'sessions/destroy'
  namespace :api do
    resources :users, only: [:index, :show, :create, :update, :destroy, :display, :signup]
    resources :plants, only: [:index, :show, :create, :update, :destroy]
    resources :trade_listings, only: [:index, :show, :create, :update, :destroy]
    resources :trade_offers, only: [:index, :show, :create, :update, :destroy]
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :users, only: [:show, :create]

  get '/signup', to: "users#create"
  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  get '/logout', to: "sessions#destroy"

end
