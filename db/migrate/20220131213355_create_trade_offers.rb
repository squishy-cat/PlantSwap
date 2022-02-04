class CreateTradeOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :trade_offers do |t|
      t.references :plant_wanted, foreign_key: { to_table: 'plants' }
      t.references :plant_offered, foreign_key: { to_table: 'plants' }
      t.boolean :accepted, default: false
      t.boolean :complete, default: false
      t.belongs_to :trade_listing, null:false, foreign_key:true
      t.references :offer_from, foreign_key: { to_table: 'users' }
      t.references :offer_to, foreign_key: { to_table: 'users' }

      t.timestamps
    end
  end
end
