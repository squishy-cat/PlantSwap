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

    def user_plants
        plants = Plant.where("user_id = ?", params[:user_id])
        render json: plants
    end

    def create
        plant = Plant.create!(plant_params)
        render json: plant, status: :created
    end

    def update
        plant = find_plant
        plant.update(plant_params)
        render json: plant
    end

    def destroy
        plant = find_plant
        plant.destroy
    end

    private

    def find_plant
        Plant.find(params[:id])
    end

    def plant_params
        params.permit(:common_name, :latin_name, :picture, :phase, :care_instructions, :pet_safe, :user_id, :listed)
    end

end
