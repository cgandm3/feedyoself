var prices = [];

$(document).ready(function(){
    $("#submit").click(function(){
      prices.push(document.getElementById("price").value);
      // cuisines.push(document.getElementById("exampleInputName2").value);
      getLocation();
    });
    prices.push(document.getElementById("price").value);
    // cuisines.push(document.getElementById("exampleInputName2").value);
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
    var y = prices[prices.length - 1];
    var userLongitude = position.coords.longitude;
    var userLatitude = position.coords.latitude;
    // var placeLocality = document.getElementsByClassName("postalCode")[0].innerText;

// finally calling ajax function to post data to new search object

        ajax(y,userLatitude,userLongitude);
        window.location.assign("/searches/show");

          // location.reload(true);


}

// ajax function to post input data to new search object to be accessible by rails

function ajax(price,lat,long){

  $.ajax({
    type: "POST",
    url: "/searches",
    dataType: 'json',
    data: { search: {price: price, latitude: lat, longitude: long}},
  });

}

function reloadLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionAgain);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// if geolocation is available, runs showPosition function

function showPositionAgain(position) {
// grabbing input values and location values to be used in ajax post for new search item
    var y = prices[prices.length - 1];
    var userLongitude = position.coords.longitude;
    var userLatitude = position.coords.latitude;

    console.log(y);
    console.log(userLongitude);
    console.log(placeLatitude);

    var bounds = new google.maps.LatLngBounds();

        var myCenter = new google.maps.LatLng(userLatitude,userLongitude);

        var marker;

        var mapProp = {
          center: myCenter,
          zoom:10,
          zoomControl:false,
          panControl:false,
          mapTypeId:google.maps.MapTypeId.ROAD,
          styles: [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke",
          "stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text",
          "stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon",
          "stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text",
          "stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon",
          "stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry",
          "stylers":[{"visibility":"simplified"}]},{"featureType":"water",
          "stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill",
          "stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text",
          "stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon",
          "stylers":[{"gamma":1},{"saturation":50}]}],
        };


        var map = new google.maps.Map(document.getElementById("map"),mapProp);

        var marker2=new google.maps.Marker({
          position:myCenter,
        });

        marker2.setIcon('http://www.thatscoop.com/app/webroot/img/emoticons/happy.png');

        marker2.setMap(map);

    for(var i = 0; i < 3; i++){

        var menuItem = document.getElementsByClassName("menuItem")[i].innerText;
        var placeLongitude = document.getElementsByClassName("longitude")[i].innerText;
        var placeLatitude = document.getElementsByClassName("latitude")[i].innerText;
        var restaurantName = document.getElementsByClassName("restaurantName")[i].innerText;
        var myCenter2 = new google.maps.LatLng(placeLatitude,placeLongitude);
        var address = document.getElementsByClassName("address")[i].innerText;
        var phoneNumber = document.getElementsByClassName("phoneNumber")[i].innerText;

        var marker = new google.maps.Marker({
          position:myCenter2

    });
        marker.setIcon('http://www.flawlessmilano.com/private/wp-content/themes/flawless/images/food-icon.png')

        marker.setMap(map);
        bounds.extend(marker.position);

        // google.maps.event.addListener(marker, 'click', function(){});

        var contentString = '<div id="mapWindow"><h5>' + restaurantName + '</h5>' + '<p>' + menuItem + '</p>' +
        '<a class="infoLink">more info</a>'+'<div class="additionalInfo" style="display:none;">'+ address + '<br>' + phoneNumber + '</div></div>';

        var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

    //         google.maps.event.addListener(marker, 'mouseover', function() {
    //     infowindow.open(map, this);
    // });
    //
    // // assuming you also want to hide the infowindow when user mouses-out
    // google.maps.event.addListener(marker, 'mouseout', function() {
    //     infowindow.close();
    // });

            infowindow.open(map,marker);

      }


// extending the bounds of the map to show both current location and restaraunt
        bounds.extend(marker2.position);

        map.fitBounds(bounds);

        $("#map").css({'background':'white'});



// finally calling ajax function to post data to new search object

}
