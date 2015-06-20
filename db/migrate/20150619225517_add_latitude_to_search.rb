class AddLatitudeToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :latitude, :float
  end
end
