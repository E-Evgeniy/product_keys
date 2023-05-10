class CreateUsers < ActiveRecord::Migration[7.0]
    def change
      create_table :users do |t|
        t.string :first_name, unique: true
        t.string :last_name
        t.string :entitlement
  
        t.timestamps
      end
    end
  end