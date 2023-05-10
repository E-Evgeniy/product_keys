class CreateClients < ActiveRecord::Migration[7.0]
    def change
      create_table :clients do |t|
        t.string :name, unique: true
        t.string :email, unique: true
        t.string :comment
  
        t.timestamps
      end
    end
  end