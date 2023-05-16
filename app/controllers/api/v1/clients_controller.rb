# frozen_string_literal: true

# Controller the API ClientsController
module Api
  module V1
    # ClientsController
    class ClientsController < BaseController
      def index
        clients = Client.order(name: :asc).map do |client|
          {
            id: client.id,
            name: client.name,
            email: client.email,
            comment: client.comment,
            created_at: client.created_at,
            activy_keys: client.product_keys.where(status: true).count,
            all_keys: client.product_keys.count,
          }
        end

        render(json: { clients: })
      end

      def show
        client_show = Client.find(params[:id])
        client = {}
        client[:id] = client_show.id
        client[:name] = client_show.name
        client[:email] = client_show.email
        client[:comment] = client_show.comment
        client[:created_at] = client_show.created_at
        client[:activy_keys] = client_show.product_keys.where(status: true).count
        client[:all_keys] = client_show.product_keys.count

        render(json: { client: })
      end

      def update
        client = Client.find(params[:id])

        if client.update(client_params)
          render(json: {}, status: :created)
        else
          render json: { error: client.errors.messages }, status: 422
        end
      end

      def create
        if Client.create(client_params)
          render(json: {}, status: :created)
        else
          render json: { error: client.errors.messages }, status: 422
        end
      end

      def destroy
        client = Client.find(params[:id])

        if client.destroy
          render(json: {}, status: :deleted)
        else
          render json: { error: client.errors.messages }, status: 422
        end
      end

      def find
        client = validates_client(params["inputName"], params["inputEmail"])

        render(json: { client: })
      end

      def find_for_edit
        client_edit = Client.find(params["id"])

        client = validates_client(params["inputName"], params["inputEmail"])

        client["inputName"] = true if params[:countEditName] == "0" || client_edit.name == params["inputName"]
        client["inputEmail"] = true if params[:countEditEmail] == "0" || client_edit.email == params["inputEmail"]

        render(json: { client:, client_edit: })
      end

      def client_keys
        client = Client.find(params[:client_id])
        
        if params[:showKeys] == "all"
          product_keys = client_all_keys(client.product_keys)
          puts("product_keys = #{product_keys}")
        end
        render(json: { product_keys: })
      end

      def check_name_for_edit_key
        client = find_client(params[:countChangeName], params[:client_id], params[:nameClient])

        if !client.nil?
          client = true
        else
          client = false
        end

        render(json: { client: })
      end

      private

      def find_client(count, client_id, client_name)
        if count.to_i.zero?
          Client.find(client_id)
        else
          Client.where(name: client_name).first
        end
      end

      def client_all_keys(keys)
        keys = keys.map do |key|
          {
            id: key.id,
            name: key.name,
            comment: key.comment,
            duration: OperationsWithKey.working_days(key),
            type_key: key.types_of_key.name,
            status: key.status,
            created_at: key.created_at.strftime("%d.%m.%Y")
          }
        end
        keys
      end

      def validates_client(inputName, inputEmail)
        client = {}
        client["inputName"] = Client.where(name: inputName).empty?
        client["inputEmail"] = Client.where(email: inputEmail).empty?
        client
      end

      def client_params
        params.require(:client).permit(:name, :email, :comment)
      end
    end
  end
end
