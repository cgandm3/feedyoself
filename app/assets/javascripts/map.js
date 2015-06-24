var prices = []
var cuisines = []

$(document).ready(function(){
  var menuItem = document.getElementById("menuItem").innerHTML;
  console.log(menuItem);
    $("#submit").click(function(){
      prices.push(document.getElementById("price").value);
      cuisines.push(document.getElementById("exampleInputName2").value);
      getLocation();
      console.log(prices);
    });
    prices.push(document.getElementById("price").value);
    cuisines.push(document.getElementById("exampleInputName2").value);
    reloadLocation();
});



var x = document.getElementById("demo");

// function getLocation runs on button click determining if browser geolocation
// is available

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// if geolocation is available, runs showPosition function

function showPosition(position) {

// grabbing input values and location values to be used in ajax post for new search item
    console.log(menuItem);
    var y = prices[prices.length - 1];
    var z = cuisines[cuisines.length -1];
    var userLongitude = position.coords.longitude;
    var userLatitude = position.coords.latitude;
    var placeLongitude = document.getElementById("longitude").innerText;
    var placeLatitude = document.getElementById("latitude").innerText;
    var restaurantName = document.getElementById("restaurantName").innerText;
    var placeZip = document.getElementById("postalCode").innerText;

    console.log(y);
    console.log(userLongitude);
    console.log(placeLatitude);
    console.log(placeZip);

// finally calling ajax function to post data to new search object

        ajax(y,z,userLatitude,userLongitude,placeZip);
          location.reload(true);


}

// ajax function to post input data to new search object to be accessible by rails

function ajax(price,cuisine,lat,long,zip){

  $.ajax({
    type: "POST",
    url: "/searches",
    dataType: 'json',
    data: { search: {cuisine: cuisine, price: price, latitude: lat, longitude: long, location: zip}},
  });


}

function reloadLocation() {
  console.log("hi")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionAgain);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// if geolocation is available, runs showPosition function

function showPositionAgain(position) {
    console.log("hello")
// grabbing input values and location values to be used in ajax post for new search item
    console.log(menuItem.innerText);
    var y = prices[prices.length - 1];
    var z = cuisines[cuisines.length -1];
    var userLongitude = position.coords.longitude;
    var userLatitude = position.coords.latitude;
    var placeLongitude = document.getElementById("longitude").innerText;
    var placeLatitude = document.getElementById("latitude").innerText;
    var restaurantName = document.getElementById("restaurantName").innerText;
    var placeZip = document.getElementById("postalCode").innerText;

    console.log(y);
    console.log(userLongitude);
    console.log(placeLatitude);
    console.log(placeZip);

    var bounds = new google.maps.LatLngBounds();

        var myCenter = new google.maps.LatLng(userLatitude,userLongitude);
        var myCenter2 = new google.maps.LatLng(placeLatitude,placeLongitude);

        var marker;

        var mapProp = {
          center: myCenter,
          zoom:10,
          zoomControl:false,
          panControl:false,
          mapTypeId:google.maps.MapTypeId.ROAD
        };

        var map = new google.maps.Map(document.getElementById("map"),mapProp);

        var marker2=new google.maps.Marker({
          position:myCenter,
        });

        marker2.setMap(map);

        var marker = new google.maps.Marker({
          position:myCenter2

        });

        marker.setMap(map);

// extending the bounds of the map to show both current location and restaraunt

        bounds.extend(marker.position);
        bounds.extend(marker2.position);

        map.fitBounds(bounds);

        var infowindow = new google.maps.InfoWindow({
              content: "ITS YOU"
            });

            infowindow.open(map,marker2);

var contentString = '<h3>' + restaurantName + '</h3>' + '<h4>' + menuItem.innerText + '</h4>'

        var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            infowindow.open(map,marker);

// finally calling ajax function to post data to new search object

}
