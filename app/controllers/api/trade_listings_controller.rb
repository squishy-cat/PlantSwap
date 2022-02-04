class Api::TradeListingsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

    def index
        listings = TradeListing.all
        render json: listings
    end

    def show
        listing = find_listing
        render json: listing
    end

    def create
        listing = TradeListing.create!(listing_params)
        render json: listing, status: :created
    end

    def update
        listing = find_listing
        TradeListing.update!(listing_params)
        render json: listing
    end

    def delete
        listing = find_listing
        TradeListing.destroy
    end

    private

    def find_listing
        TradeListing.find(params[:id])
    end

    def listing_params
        params.permit(:location, :mail, :trade_for, :plant_id, :user_id)
    end

end
