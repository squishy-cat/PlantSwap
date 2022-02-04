class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_user
    User.find_by(id: session[:user_id])
  end

  def record_not_found
    render json: {error: "Record not found"}, status: 404
  end

  def unprocessable_entity(e)
    render json: { errors: e.record.errors.full_messages }, status: 422
  end


end
