class CreateProductKeys < ActiveRecord::Migration[7.0]
    def change
      create_table :product_keys do |t|
        t.string :name, unique: true
        t.integer :duration
        t.string :ip
        t.boolean :status
        t.string :comment
        t.boolean :infinite_period
        t.references :client, null: true, foreign_key: true
        t.references :types_of_key, foreign_key: true
  
        t.timestamps
      end
    end
  end