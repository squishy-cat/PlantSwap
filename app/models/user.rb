class User < ApplicationRecord

    has_secure_password

    has_many :plants
    has_many :trade_listings
    has_many :trade_offers, through: :trade_listings

end
