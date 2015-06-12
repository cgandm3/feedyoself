class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string :location
      t.float :price
      t.string :cuisine

      t.timestamps null: false
    end
  end
end
