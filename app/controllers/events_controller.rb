class EventsController < ApplicationController
  #before_action  :is_user_signed_in!


  def index
    @events = current_user.events#.paginate(:page => params[:page], :per_page => 5)
    render json: {events: @events}, status: 200
  end

  def create
    @event = current_user.events.new(event_params)
    if  @event.save
      render json: {event: @event}, status: 200
    else
      render json: {message: "event not created" , error: @event.errors}, status: 400
    end
  end

  def delete
  end

  def event_params
    event_parms = params.require(:event).permit(:title, :location, :time, :date, :latitude, :longitude)
    event_parms[:time] = "#{event_parms[:date]} #{event_parms[:time]}"
    event_parms.except(:date)
  end

end
