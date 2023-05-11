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

      def show
      end

      def checkfields
        puts("ididi")
        puts(params)
        rec_volume_keys = check_volume(params[:inputVolumeKeys].to_f)
        rec_duration_keys = check_volume(params[:inputDurationKeys].to_f)

        render(json: { rec_volume_keys:, rec_duration_keys: })
      end

      private

      def check_volume(number)
        puts("number #{number}")
        puts("number.integer? #{number.integer?}")
        if number.positive? && number.integer?
          true
        else
          false
        end
      end
    end
  end
end
