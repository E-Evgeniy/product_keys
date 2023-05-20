Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ('/')
  # root 'articles#index'
  root to: 'react#home'
  get '/api/v1/client/find', to: 'api/v1/clients#find'
  get 'api/v1/client/find_for_edit', to: 'api/v1/clients#find_for_edit'
  get '/api/v1/client/product_keys', to: 'api/v1/clients#client_keys'
  get '/api/v1/client/check_name_for_edit_key', to: 'api/v1/clients#check_name_for_edit_key'
  get '/api/v1/client/find_client_name', to: 'api/v1/clients#find_client_name'

  namespace :api do
    namespace :v1 do
      resources :clients
    end
  end

  get '/api/v1/type_of_key/find', to: 'api/v1/types_of_keys#find'
  get '/api/v1/type_of_key/find_for_edit', to: 'api/v1/types_of_keys#find_for_edit'

  namespace :api do
    namespace :v1 do
      resources :types_of_keys
    end
  end

  get '/api/v1/type_of_key/names_types_keys', to: 'api/v1/types_of_keys#names_types_keys'
  get '/api/v1/type_key/find_id', to: 'api/v1/types_of_keys#find_id'

  namespace :api do
    namespace :v1 do
      resources :product_keys
    end
  end

  get '/api/v1/product_key/check_fields', to: 'api/v1/product_keys#checkfields'
  get '/api/v1/product_key/check_duration', to: 'api/v1/product_keys#check_duration'
  get '/api/v1/product_key/calculation_need_duration', to: 'api/v1/product_keys#calculation_need_duration'
  get '/api/v1/product_key/free_key', to: 'api/v1/product_keys#free_key'


  get '*path', to: 'react#home'
end
