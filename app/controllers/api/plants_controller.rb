class Api::PlantsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

    def index
        plants = Plant.all
        render json: plants
    end

    def show
        plant = find_plant
        render json: plant
    end

    def show_listings
        plants = Plant.all
        render json: plants, each_serializer: PlantTradeListingSerializer
    end

    def create
        plant = Plant.create!(plant_params)
        render json: plant, status: :created
    end

    def update
        plant = find_plant
        plant.update!(plant_params)
        render json: plant
    end

    def delete
        plant = find_plant
        plant.destroy
    end

    private

    def find_plant
        Plant.find(params[:id])
    end

    def plant_params
        params.permit(:common_name, :latin_name, :picture, :phase, :care_instructions, :pet_safe, :user_id)
    end

end
