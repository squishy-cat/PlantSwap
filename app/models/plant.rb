class Plant < ApplicationRecord

    belongs_to :user
    has_many :trade_offers, through: :trade_listing

end
