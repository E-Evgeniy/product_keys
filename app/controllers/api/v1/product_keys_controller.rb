# frozen_string_literal: true

# Controller the API ProductKeysController
module Api
    module V1
      # ProductKeysController
      class ProductKeysController < BaseController
        def create
          OperationsWithKey.generate_name
          if TypesOfKey.create(type_of_key_params)
            render(json: {}, status: :created)
          else
            render json: { error: client.errors.messages }, status: 422
          end
        end
  
        def get_name
          key_name = ProductKey.create_key
        end
      end
    end
  end