'use strict';

var oslo = {lat: 59.91588, lng: 10.7674953};

var parks = {
	steinbru: {lat: 59.973849, lng: 10.882963},
	holmenkollen: {lat: 59.9640583, lng: 10.6675896},
	sognsvann: {lat: 59.9701258, lng: 10.7305066},
	skullerud: {lat: 59.8628795, lng: 10.8475724}
};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: oslo,
        styles: style,
    });
	for (var park in parks) {
		// Add the circle for this city to the map.
		var cityCircle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: map,
			center: parks[park],
			radius: 1000,
		});
	}
}
