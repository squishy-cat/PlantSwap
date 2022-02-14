class User < ApplicationRecord

    validates :name, presence: true
    validates :email, presence: true, uniqueness: {message: "%{value} already has an account. Please use a different email!"}

    has_secure_password

    has_many :plants, dependent: :destroy
    has_many :trade_listings, dependent: :destroy
    has_many :trade_offers, through: :trade_listings

end
