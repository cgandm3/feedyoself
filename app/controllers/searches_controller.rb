class SearchesController < ApplicationController

  def index

    @searches = Search.all

    respond_to do |format|
          format.html {
              render
          }
          format.json {
              render json: @searches
          }
        end

  end

  def show

    @search = Search.find(params[:id])

    latitude = @search.latitude
    longitude = @search.longitude
    @response = HTTParty.get"https://api.locu.com/v1_0/venue/search/?location=#{latitude}%2C#{longitude}&has_menu=TRUE&radius=2000&category=restaurant&api_key=7a3583e12a33f7edc1b626c5fdbba42a266d11c4"
    @places = []
    @randomItem = []

  end

  def new
    @search = Search.new

  end

  def create
    @search = Search.new(params.require(:search).permit(:location, :cuisine, :price, :latitude, :longitude))
    @search.save
    # raise @search.inspect

    if @search.save
      render searches_path
    end

  end

  def about
  end

end
