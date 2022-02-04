class User < ApplicationRecord

    has_secure_password

    has_many :plants, dependent: :destroy
    has_many :trade_listings, dependent: :destroy
    has_many :trade_offers, through: :trade_listings

end
