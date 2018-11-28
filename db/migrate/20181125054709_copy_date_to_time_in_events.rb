class CopyDateToTimeInEvents < ActiveRecord::Migration[5.1]
  def self.up
    Event.find_each do |e|
      if e.date.present? and e.time.present?
        e.time= DateTime.parse("#{e.date.strftime('%Y-%m-%d')} #{e.time.strftime('%H:%M %z')}")
        e.save
      end
    end
  end

  def self.down 
    Event.find_each do |e|
      e.date = e.time
      e.save
    end
  end
end
