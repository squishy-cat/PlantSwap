class TradeOffer < ApplicationRecord

    belongs_to :plant_wanted, class_name: "Plant", foreign_key: "plant_wanted_id"
    belongs_to :plant_offered, class_name: "Plant", foreign_key: "plant_offered_id"
    belongs_to :offer_from, class_name: "User", foreign_key: "offer_from_id"
    belongs_to :offer_to, class_name: "User", foreign_key: "offer_to_id"
    belongs_to :trade_listing

end
