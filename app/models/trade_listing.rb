class TradeListing < ApplicationRecord

    belongs_to :user
    belongs_to :plant
    has_many :trade_offers, dependent: :destroy
    
end
