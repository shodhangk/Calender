class Event < ApplicationRecord
  validates :title, :time, :location, presence: true, length: {minimum:2, maximum:100}
  
  belongs_to :user
  geocoded_by :location
  after_validation :geocode, :if => lambda{ |obj| obj.location_changed? }

  def as_json(options={})
    super().merge!(
      :date => self.time.to_date
    )
    
  end


  
end
