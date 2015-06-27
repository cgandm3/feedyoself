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

  def show

    latitude = Search.last.latitude
    longitude = Search.last.longitude
    @response = HTTParty.get"https://api.locu.com/v1_0/venue/search/?location=#{latitude}%2C#{longitude}&has_menu=TRUE&radius=2000&category=restaurant&api_key=1a6cfffb78fb611346b96a78087079c36173d8fa"
    @places = []

  end

  def about
  end

end
