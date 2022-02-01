class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.text :bio
      t.string :address
      t.string :photo
      t.string :fav_plant
      t.string :interested_in

      t.timestamps
    end
  end
end
