require 'rails_helper'

	RSpec.describe SearchesController, :type => :controller do
		before :each do
    		@search = Search.create(location: "Los Angeles", price: 8.00, cuisine: "chinese", latitude: -121.49, longitude: 34.00)
  		end

		let(:valid_attributes) do
  			{
  				:location => "Santa Monica",
  				:price => 7.00,
  				:cuisine => "pizza",
  				:latitude => -121.495,
  				:longitude => 34.0131444
  			}
  		end

		describe "GET index" do
			it "is has a 200 status code" do
				get :index
				expect(response.status).to eq(200)
			end
		end

		describe "render index" do
			it "renders the index template" do
      	get :index
      	expect(response).to render_template("index")
    	end
		end

		# describe "GET new" do
		# 	before :each do
		# 		get :new
		# 	end
		# 	it "assigns a search to @search" do
		# 		expect(assigns(:search)).to be_a_new(Search)
		# 	end
		# end

		# describe "POST create" do
		# 	before :each do
		# 		get :new
		# 	end
		# 	describe "with valid params" do
		# 		it "creates a new Search" do
		# 			expect { post :create, {:search => valid_attributes}}.to change(Search, :count).by(1)
		# 		end
		# 		it "assigns a new search to @search" do
		# 			post :create, {:search => valid_attributes}
		# 			expect(assigns(:search)).to be_a(Search)
		# 		end
		# 	end
		# end
	end
