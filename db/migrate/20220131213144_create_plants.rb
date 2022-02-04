class CreatePlants < ActiveRecord::Migration[6.1]
  def change
    create_table :plants do |t|
      t.string :common_name
      t.string :latin_name
      t.string :picture
      t.string :phase
      t.string :care_instructions
      t.string :pet_safe
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
