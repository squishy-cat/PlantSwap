class User < ApplicationRecord

    validates :name, :email, presence: true, uniqueness: true

    has_secure_password

    has_many :plants, dependent: :destroy
    has_many :trade_listings, dependent: :destroy
    has_many :trade_offers, through: :trade_listings

end
