class Event < ApplicationRecord
  belongs_to :user


  # def set_time_date
  #   Time.utc(self.date.year,self.date.month,self.date.day,self.time.hour,self.time.min,self.time.sec)
  # end
end
