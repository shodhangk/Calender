class SessionsController < ApplicationController

  def login

  end

  def create
    p request.env["omniauth.auth"]
    p "#" * 100
    user = User.from_omniauth(request.env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to root_path
  end

  def destroy
    session.clear
    redirect_to root_path
  end
end