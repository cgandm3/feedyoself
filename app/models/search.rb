class Search < ActiveRecord::Base
	validates :price, :latitude, :longitude, presence: true
	validates :price, numericality: true
end
