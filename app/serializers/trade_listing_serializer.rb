class TradeListingSerializer < ActiveModel::Serializer

  attributes :id, :location, :mail, :trade_for, :user_id, :plant_id
  has_many :trade_offers  

end
