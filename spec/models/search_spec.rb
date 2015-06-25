require "rails_helper"

RSpec.describe Search do
  it "is invalid without a longitude" do
    sch = Search.new(location: "Santa Monica", price: 7.00, cuisine: "pizza", latitude: -118.495, longitude: nil)
    expect(sch).to be_invalid
  end
  
  it "is invalid without a latitude" do
    sch = Search.new(location: "Santa Monica", price: 7.00, cuisine: "pizza", latitude: nil, longitude: 34.0131444)
    expect(sch).to be_invalid
  end 

  it "is invalid without a location" do
  	sch = Search.new(location: nil, price: 7.00, cuisine: "pizza", latitude: -121.495, longitude: 34.0131444)
    expect(sch).to be_invalid
  end

  it "is invalid without a price" do
  	sch = Search.new(location: "Santa Monica", price: nil, cuisine: "pizza", latitude: -121.495, longitude: 34.0131444)
    expect(sch).to be_invalid
  end

  it "is invalid without a cuisine" do
  	sch = Search.new(location: "Santa Monica", price: 7.00, cuisine: nil, latitude: -121.495, longitude: 34.0131444)
    expect(sch).to be_invalid
  end

  it "is invalid with an integer in cuisine" do
  	sch = Search.new(location: "Santa Monica", price: 7.00, cuisine: 9.00, latitude: -121.495, longitude: 34.0131444)
    expect(sch).to be_invalid
  end

  it "is invalid with a string in price" do
  	sch = Search.new(location: "Santa Monica", price: "seven", cuisine: "pizza", latitude: -121.495, longitude: 34.0131444)
    expect(sch).to be_invalid
  end

end