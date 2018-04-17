'use strict';

var oslo = {lat: 59.91588, lng: 10.7674953};

var parks = {
	//vesletjern: {lat: 59.9590291, lng: 10.8634601},
	holmenkollen: {lat: 59.9640583, lng: 10.6675896},
	sognsvann: {lat: 59.9701258, lng: 10.7305066},
	skullerud: {lat: 59.8628795, lng: 10.8475724}
};

var overlay;
VesletjernOverlay.prototype = new google.maps.OverlayView();

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
			radius: 300,
		});
	}

	var bounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(59.9590291, 10.8634601),
		  new google.maps.LatLng(59.9990291, 10.8934601));

	// The photograph is courtesy of the U.S. Geological Survey.
	var srcImage = 'rocket.png';

	// The custom USGSOverlay object contains the USGS image,
	// the bounds of the image, and a reference to the map.
	overlay = new VesletjernOverlay(bounds, srcImage, map);
}

/** @constructor */
function VesletjernOverlay(bounds, image, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
VesletjernOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

VesletjernOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};
