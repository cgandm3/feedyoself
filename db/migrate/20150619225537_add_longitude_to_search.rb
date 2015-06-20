class AddLongitudeToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :longitude, :float
  end
end
