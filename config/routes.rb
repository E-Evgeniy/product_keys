Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: "react#home"
  get "/api/v1/client/find", to: "api/v1/clients#find"
  get "api/v1/client/find_for_edit", to: "api/v1/clients#find_for_edit"

  namespace :api do
    namespace :v1 do
      resources :clients
    end
  end

  get "/api/v1/type_of_key/find", to: "api/v1/types_of_keys#find"
  get "/api/v1/type_of_key/find_for_edit", to: "api/v1/types_of_keys#find_for_edit"

  namespace :api do
    namespace :v1 do
      resources :types_of_keys
    end
  end

  get "/api/v1/type_of_key/names_types_keys", to: "api/v1/types_of_keys#names_types_keys"

  namespace :api do
    namespace :v1 do
      resources :product_keys
    end
  end

  get "*path", to: "react#home"
end