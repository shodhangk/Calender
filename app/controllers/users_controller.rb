class UsersController < ApplicationController
  before_action  :is_user_signed_in!
  def index
  	@event = Event.new
  end

  def create_event
  	p params
  	render json:"success"
  	return
  end

end
