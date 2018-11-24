class DeltaLogger
  def initialize app ,formatting_char = '='
  	@formatting_char = formatting_char
    @app = app
  end

  def call env
    request_started_on = Time.now
    @status, @headers, @response = @app.call(env)
    request_ended_on = Time.now

    p @formatting_char * 100
    p "Request delta time: #{request_ended_on - request_started_on} seconds."
    p @formatting_char * 100

    [@status, @headers, @response]
  end
end