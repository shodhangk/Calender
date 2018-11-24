class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user
  #before_action :test_byebug

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def is_user_signed_in!
  	puts "**************"
  	redirect_to  login_path  unless current_user
  end

  def test_byebug
  	p request.env
  end
end