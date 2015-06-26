class Search < ActiveRecord::Base
	validates :cuisine, :price, :latitude, :longitude, presence: true
	validates :price, numericality: true
	# validates :cuisine, format: { with: /\A^(?![1-9]\d*)$\z/i }, presence: true
end
