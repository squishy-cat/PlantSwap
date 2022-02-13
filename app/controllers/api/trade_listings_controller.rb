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

    def find_for_plant
        listing = TradeListing.find_by("plant_id = ?", params[:plant_id])
        render json: listing
    end

    def delete_for_plant
        listing = TradeListing.find_by("plant_id = ?", params[:plant_id])
        if listing
            listing.destroy
            render json: {}
        end
    end

    def create
        listing = TradeListing.create!(listing_params)
        render json: listing, status: :created
    end

    def update
        listing = find_listing
        listing.update(listing_params)
        render json: listing
    end

    def destroy
        listing = find_listing
        listing.destroy
        render json: {}
    end

    private

    def find_listing
        TradeListing.find(params[:id])
    end

    def listing_params
        params.permit(:location, :mail, :trade_for, :plant_id, :user_id)
    end

end
