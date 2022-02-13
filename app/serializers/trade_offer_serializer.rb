class TradeOfferSerializer < ActiveModel::Serializer

  attributes :id, :plant_offered_id, :plant_wanted_id, :offer_from_id, :offer_to_id, :trade_listing_id, :accepted, :complete, :declined
  
end
