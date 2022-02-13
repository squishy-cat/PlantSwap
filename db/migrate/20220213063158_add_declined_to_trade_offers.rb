class AddDeclinedToTradeOffers < ActiveRecord::Migration[6.1]
  def change
    add_column :trade_offers, :declined, :boolean, default: false
  end
end
