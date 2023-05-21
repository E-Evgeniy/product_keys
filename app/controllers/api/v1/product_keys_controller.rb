# frozen_string_literal: true

# Controller the API ProductKeysController
module Api
  module V1
    # ProductKeysController
    class ProductKeysController < BaseController
      def index
        product_keys = ProductKey.all

        render(json: { product_keys: })
      end

      def create
        for i in (0..params['productKey']['volumeKeys'].to_i - 1) do
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
          render(json: {}, status: :ok)
        else
          render json: { error: product_key.errors.messages }, status: 422
        end
      end

      def checkfields
        rec_volume_keys = check_volume(params[:inputVolumeKeys].to_f)
        rec_duration_keys = check_volume(params[:inputDurationKeys].to_f)

        render(json: { rec_volume_keys:, rec_duration_keys: })
      end

      def show
        product_key = ProductKey.find(params[:id])
        duration = OperationsWithKey.working_days(product_key)
        client = product_key.client

        client_name = if client.nil?
                        ''
                      else
                        client.name
                      end

        render(json: { product_key:, duration:, client_name: })
      end

      def calculation_need_duration
        product_key = ProductKey.find(params[:id])
        duration = OperationsWithKey.need_duration(product_key, params[:duration].to_i)

        render(json: { duration: })
      end
      

      def update
        product_key = ProductKey.find(params[:id])

        if product_key.update(product_key_params)
          render(json: {}, status: :created)
        else
          render json: { error: product_key.errors.messages }, status: 422
        end
      end

      def check_duration
        if params[:changeDuration] == 'false'
          duration = ProductKey.find(params[:product_id]).duration
        else
          duration = params[:inputDurationKeys]
        end

        rec_duration_keys = check_duration_for_edit(duration.to_f)       

        render(json: { rec_duration_keys: })

      end

      def free_key
        count_pk_free = ProductKey.where(client_id: nil).count

        count_pk_free.zero? ? rezult = false : rezult = ProductKey.where(client_id: nil).last.id

        render(json: { rezult: })
      end

      private

      def product_key_params
        params.require(:product_key).permit(:infinite_period, :duration, :types_of_key_id, :comment, :client_id, :status)
      end

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

      def check_volume(num, infinityKey = false)
        if (num.positive? && (num - num.to_i).zero?) || (infinityKey == true)
          true
        else
          false
        end
      end

      def check_duration_for_edit(num, infinityKey = false)
        if (num >= 0 && (num - num.to_i).zero?) || (infinityKey == true)
          true
        else
          false
        end
      end
    end
  end
end
