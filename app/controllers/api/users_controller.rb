class Api::UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

    # Login management

    def display
        if current_user
            render json: current_user, status: :ok
        else
            render json: "No current session stored", status: :unauthorized
        end
    end

    def signup
        user = User.create(user_params)
            if user.valid?
                session[:user_id] = user.id
                render json: user, status: :ok
            else
                render json: user.errors.full_messages, status: :unprocessable_entity
            end
    end

    # Actual endpoints go here

    def index
        users = User.all
        render json: users, each_serializer: UserWithPlantsSerializer
    end

    def show
        user = find_user
        render json: user
    end

    def update
        user = find_user
        user.update!(user_params)
        render json: user, status: 201
    end

    def delete
        user = find_user
        user.destroy
    end

    def show_user_plants
        user = find_user
        render json: user, serializer: UserWithPlantsSerializer
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:name, :email, :password, :password_confirmation, :bio, :address, :photo, :fav_plant, :interested_in)
    end

end
