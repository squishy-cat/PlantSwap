class UsersController < ApplicationController

    def show
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

end
