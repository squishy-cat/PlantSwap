class TradeOfferWithPlantAndUserSerializer < ActiveModel::Serializer

  attributes :id, :accepted, :declined, :plant_wanted_id, :plant_offered_id, :offer_from_id, :offer_to_id
  belongs_to :plant_wanted, key: :plant_wanted_id
  belongs_to :plant_offered, key: :plant_offered_id
  belongs_to :offer_from,key: :offer_from_id
  belongs_to :offer_to, key: :offer_to_id

end
