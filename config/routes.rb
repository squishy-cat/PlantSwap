Rails.application.routes.draw do

  get 'sessions/create'
  get 'sessions/destroy'
  namespace :api do
    resources :users, only: [:index, :show, :create, :update, :destroy, :display, :signup]
    resources :plants, only: [:index, :show, :create, :update, :destroy]
    resources :trade_listings, only: [:index, :show, :create, :update, :destroy, :find_for_plant, :delete_for_plant]
    resources :trade_offers, only: [:index, :show, :create, :update, :destroy, :user_trades, :pending_trades]

    get '/user-trades/:user_id', to: "trade_offers#user_trades"
    get '/user-pending/:user_id', to: "trade_offers#pending_trades"
    get '/user-plants/:user_id', to: "plants#user_plants"
    get '/plant-listing/:plant_id', to: "trade_listings#find_for_plant"
    delete '/plant-listing/:plant_id', to: "trade_listings#delete_for_plant"
    delete '/plant-listings/:listing_id', to: "trade_listings#destroy"
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :users, only: [:show, :create]

  post '/signup', to: "users#create"
  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

end
