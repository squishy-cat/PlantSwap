class CreateTradeListings < ActiveRecord::Migration[6.1]
  def change
    create_table :trade_listings do |t|
      t.string :location
      t.boolean :mail, default: true
      t.string :trade_for
      t.belongs_to :plant, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
