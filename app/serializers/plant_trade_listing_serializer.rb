class PlantTradeListingSerializer < ActiveModel::Serializer

  attributes :id, :common_name, :picture, :phase, :pet_safe, :user_id
  has_one :trade_listing, serializer: TradeListingSerializer
  
end
