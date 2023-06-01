# frozen_string_literal: true

# Controller the API TypesOfKeysController
module Api
  module V1
    # TypesOfKeysController
    class TypesOfKeysController < BaseController
      def index
        types_of_keys = TypesOfKey.order(name: :asc)

        render(json: { types_of_keys: })
      end

      def show
        types_of_key = TypesOfKey.find(params[:id])

        render(json: { types_of_key: })
      end

      def create
        if TypesOfKey.create(type_of_key_params)
          render(json: {}, status: :created)
        else
          render json: { error: client.errors.messages }, status: 422
        end
      end

      def update
        type_of_key = TypesOfKey.find(params[:id])

        if type_of_key.update(type_of_key_params)
          render(json: {}, status: :created)
        else
          render json: { error: client.errors.messages }, status: 422
        end
      end

      def destroy
        type_of_key = TypesOfKey.find(params[:id])

        if type_of_key.destroy
          render(json: {}, status: :ok)
        else
          render json: { error: type_of_key.errors.messages }, status: 422
        end
      end

      def find
        type_of_key = validates_type_of_key(params["inputName"], params["inputComment"])

        render(json: { type_of_key: })
      end

      def find_for_edit
        type_of_key_edit = TypesOfKey.find(params["id"])
        type_of_key = validates_type_of_key(params["inputName"], params["inputComment"])
        type_of_key["inputName"] = true if params[:countEditName] == "0" || type_of_key_edit.name == params["inputName"]

        if params[:countEditComment] == "0" || type_of_key_edit.comment == params["inputComment"]
          type_of_key["inputComment"] = true
        end

        render(json: { type_of_key:, type_of_key_edit: })
      end

      def names_types_keys
        names_types_of_keys = []
        TypesOfKey.order(name: :asc).each do |types_of_key|
          names_types_of_keys << types_of_key.name
        end

        if !params[:product_key_id].nil? && !names_types_of_keys.empty?
          data_form = forming_names_tpk(names_types_of_keys, params[:product_key_id])
          names_types_of_keys = data_form['names']
        end

        render(json: { names_types_of_keys: })
      end

      def find_id
        if params[:changeTypeKey] == 'false'
          pk = ProductKey.find(params[:productKeyId])
          type_key_id = pk.types_of_key.id
        else        
          type_key_id = TypesOfKey.where(name: params[:nameTypeKey]).first.id
        end

        render(json: { type_key_id: })
      end

      private

      def forming_names_tpk(names_types_of_keys, pk_id)
        pk = ProductKey.find(pk_id)
        array_and_index = {}

        if names_types_of_keys[0] != pk.types_of_key.name
          bufer = names_types_of_keys[0]
          index_pk = names_types_of_keys.index(pk.types_of_key.name)
          names_types_of_keys[0] = names_types_of_keys[index_pk]
          names_types_of_keys[index_pk] = bufer
          array_and_index["index"] = index_pk
        end
        array_and_index["names"] = names_types_of_keys

        array_and_index
      end

      def forming_id_tpk(name_index, id_types_of_keys)
        bufer = id_types_of_keys[0]
        index_pk = id_types_of_keys.index(name_index)
        id_types_of_keys[0] = id_types_of_keys[index_pk]
        id_types_of_keys[index_pk] = bufer
      end

      def validates_type_of_key(inputName, inputComment)
        type_of_key = {}
        type_of_key["inputName"] = TypesOfKey.where(name: inputName).empty?
        type_of_key["inputComment"] = TypesOfKey.where(comment: inputComment).empty?
        type_of_key
      end

      def type_of_key_params
        params.require(:type_of_key).permit(:name, :comment)
      end
    end
  end
end
