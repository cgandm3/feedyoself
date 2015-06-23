document.getElementById("submit").addEventListener('click', getLocation);

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

    var y = document.getElementById("price").value;
    var z = document.getElementById("exampleInputName2").value;
    var userLongitude = position.coords.longitude;
    var userLatitude = position.coords.latitude;
    var placeLongitude = document.getElementById("longitude").text;
    var placeLatitude = document.getElementById("latitude").text;
    var restaurantName = document.getElementById("restaurantName").text;

    var bounds = new google.maps.LatLngBounds();

        var myCenter = new google.maps.LatLng(userLatitude,userLongitude);
        var myCenter2 = new google.maps.LatLng(placeLatitude,placeLongitude);

        var marker;

        var mapProp = {
          center: myCenter,
          zoom:12,
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

        var infowindow = new google.maps.InfoWindow({
              content: "" + restaurantName
            });

            infowindow.open(map,marker);

// finally calling ajax function to post data to new search object

        ajax(y,z,userLatitude,userLongitude);
}

// ajax function to post input data to new search object to be accessible by rails

function ajax(price,cuisine,lat,long){

  $.ajax({
    type: "POST",
    url: "/searches",
    dataType: 'json',
    data: { search: {cuisine: cuisine, price: price, latitude: lat, longitude: long}},
  });

  $('#results').load(document.URL +  ' #results');

}
