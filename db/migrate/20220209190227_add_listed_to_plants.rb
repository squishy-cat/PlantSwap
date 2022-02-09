class AddListedToPlants < ActiveRecord::Migration[6.1]
  def change
    add_column :plants, :listed, :boolean, default: false
  end
end
