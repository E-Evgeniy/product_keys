# frozen_string_literal: true

# Controller the API ProductKeysController
module Api
  module V1
    # ProductKeysController
    class ProductKeysController < BaseController
      def create
        puts("PARAMS = #{params}")
        for i in (1..params["productKey"]["volumeKeys"].to_i) do
          product_key = forming_product_key(ProductKey.new, params["productKey"])

          if product_key.save
            render(json: {}, status: :created)
          else
            render json: { error: product_key.errors.messages }, status: 422
          end          
        end        
      end

      def destroy
        product_key = ProductKey.find(params[:id])

        if product_key.destroy
          render(json: {}, status: :deleted)
        else
          render json: { error: product_key.errors.messages }, status: 422
        end
      end

      def checkfields
        rec_volume_keys = check_volume(params[:inputVolumeKeys].to_f)
        rec_duration_keys = check_volume(params[:inputDurationKeys].to_f)

        render(json: { rec_volume_keys:, rec_duration_keys: })
      end

      private

      def forming_product_key(product_key, data_key)
        product_key.name = OperationsWithKey.generate_name
        product_key.status = true
        product_key.comment = data_key["comment"]
        product_key.duration = data_key["duration"].to_i
        product_key.types_of_key_id = data_key["types_of_key_id"]
        product_key.client_id = data_key["client_id"]
        product_key.infinite_period = data_key["infinite_period"]
        product_key
      end


      def check_volume(num)
        if num.positive? && (num - num.to_i).zero?
          true
        else
          false
        end
      end

    end
  end
end
