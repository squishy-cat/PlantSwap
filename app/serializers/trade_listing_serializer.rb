class TradeListingSerializer < ActiveModel::Serializer

  attributes :id, :location, :mail, :trade_for, :belongs_to, :belongs_to
  has_many :trade_offers  

end
