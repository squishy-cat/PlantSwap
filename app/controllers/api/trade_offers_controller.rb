class Api::TradeOffersController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

    def index
        offers = TradeOffer.all
        render json: offers
    end

    def show
        offer = find_offer
        render json: offer
    end

    def create
        offer = TradeOffer.create!(offer_params)
        render json: offer, status: :created
    end
    
    def update
        offer = find_offer
        TradeOffer.update!(offer_params)
        render json: offer
    end

    def delete
        offer = find_offer
        TradeOffer.destroy
    end

    private

    def find_offer
        TradeOffer.find(params[:id])
    end

    def offer_params
        params.permit(:plant_wanted, :plant_offered, :accepted, :complete, :trade_listing_id, :offer_from_id, :offer_to_id)
    end


end
