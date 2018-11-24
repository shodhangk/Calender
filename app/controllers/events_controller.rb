class EventsController < ApplicationController
  #before_action  :is_user_signed_in!

  def index
    @events = current_user.events
    render json: {events: @events}, status: 200
  end

  def create
    @event = current_user.events.new(event_params)
    @event.time = @event.set_time_date
    if  @event.save
      render json: {event: @event}, status: 200
    else
      render json: {message: "event not created" , error: @events.errors}, status: 400
    end
  end

  def delete
  end

  def event_params
    params.require(:event).permit(:title, :location, :date, :time)
  end

end
