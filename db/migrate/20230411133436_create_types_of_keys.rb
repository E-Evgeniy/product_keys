class CreateTypesOfKeys < ActiveRecord::Migration[7.0]
    def change
      create_table :types_of_keys do |t|
        t.string :name
        t.string :comment
  
        t.timestamps
      end
    end
  end