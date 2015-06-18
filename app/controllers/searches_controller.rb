class SearchesController < ApplicationController

  def index
    @search = Search.all
  end

  def new
    @search = Search.new
  end

  def create
  end

  def show
  end

end
