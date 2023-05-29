# frozen_string_literal: true

# Controller the API ProductKeysController
module Api
  module V1
    # ProductKeysController
    class ProductKeysController < BaseController
      ALL = 'Все'
      ACTIVITE = 'Активные'
      def index

        product_keys = GetProductKeys(params).order(created_at: :desc).map do |pk|
          {
            id: pk.id,
            name: pk.name,
            status: pk.status,
            comment: pk.comment,
            duration: OperationsWithKey.working_days(pk),
            created_at: pk.created_at,
            type_of_key: pk.types_of_key.name,
            client: pk.client,
          }
        end

        render(json: { product_keys: })
      end

      def create
        for i in (0..params['productKey']['volumeKeys'].to_i - 1) do
          product_key = forming_product_key(ProductKey.new, params["productKey"])

          types_of_key = params["productKey"]["types_of_key_id"]
          product_key.types_of_key_id = TypesOfKey.where('name=?',types_of_key).first.id

          if product_key.save
            status_create = true
          else
            status_create = false
          end          
        end

        if status_create
          render(json: {}, status: :ok)
        else
          render json: { error: product_key.errors.messages }, status: 422
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

      def update
        product_key = ProductKey.find(params[:id])

        params[:product_key][:created_at] = Time.current if params[:changeDuration]
        duration = params[:product_key][:duration].to_i
        params[:product_key][:duration] = duration + 1 if params[:product_key][:duration].to_i > 0
          

        puts("params #{params}")
         
      
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

      def GetProductKeys(params)
        result_find = find_name_pk(params[:findNamePK])
        result_find = find_PK_with_checkbox(params[:inputInfiniteKey], 'infinite_period', result_find) if params[:inputInfiniteKey] == 'true'
        result_find = find_type_keys(params[:typeKey], result_find) if !params[:typeKey].empty?
        result_find = find_status_keys(params[:statusKey], result_find) if !params[:statusKey].empty?

        result_find
      end

      def find_name_pk(need_name_pk)
        if need_name_pk.empty?
          ProductKey.all
        else
          ProductKey.where('name LIKE ?', "%#{need_name_pk}%")
        end
      end

      def find_type_keys(type_key, data_with_pk)
        if type_key == ALL
          data_with_pk
        else
          id_type = TypesOfKey.where('name=?', "#{type_key}").first.id
          data_with_pk.where('types_of_key_id=?', "#{id_type}")
        end
      end

      def find_status_keys(status_key, data_with_pk)
        if status_key == ALL
          data_with_pk
        else
          status = false
          status = true if status_key == ACTIVITE
          data_with_pk.where('status=?', "#{status}")
        end
      end



      def find_PK_with_checkbox(checkbox_data, checkbox_name, data_with_pk)

        data_with_pk.where("#{checkbox_name} = ?", checkbox_data)
      end

      def product_key_params
        params.require(:product_key).permit(:infinite_period, :duration, :types_of_key_id, :comment, :client_id, :status, :created_at)        
      end

      def forming_product_key(product_key, data_key)
        product_key.name = OperationsWithKey.generate_name
        product_key.status = true
        product_key.comment = data_key['comment']
        product_key.duration = data_key['duration'].to_i
        product_key.types_of_key_id = data_key['types_of_key_id']
        product_key.client_id = data_key['client_id']
        product_key.infinite_period = data_key['infinite_period']
        product_key
      end

      def check_volume(num, infinity_key: false)
        if (num.positive? && (num - num.to_i).zero?) || (infinity_key == true)
          true
        else
          false
        end
      end

      def check_duration_for_edit(num, infinity_key: false)
        if (num >= 0 && (num - num.to_i).zero?) || (infinity_key == true)
          true
        else
          false
        end
      end
    end
  end
end
