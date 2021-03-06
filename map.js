'use strict';

var oslo = {lat: 59.91588, lng: 10.7674953};

var parks = {
	Vesletjern: {lat: 59.960303, lng: 10.862690},
	Holmenkollen: {lat: 59.9640583, lng: 10.6675896},
	Sognsvann: {lat: 59.9701258, lng: 10.7305066},
	Skullerud: {lat: 59.8628795, lng: 10.8475724}
};

var overlay;

function initMap() {
	VesletjernOverlay.prototype = new google.maps.OverlayView();

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

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11
		,center: oslo
		//zoom: 16
		//,center: parks.Vesletjern
		,styles: style
	});

	for (var park in parks) {
		var marker = new google.maps.Marker({
			position: parks[park],
			map: map,
			title: park
		});
        marker.addListener('click', function() {
            document.location = 'detail.png';
        });
	}

    var imageBounds = {
        north: 59.961481,
        south: 59.958181,
        east: 10.866039,
        west: 10.856539
    };

	var overlayImage = 'vesletjern.png';

	// The custom Overlay object contains the image,
	// the bounds of the image, and a reference to the map.
	overlay = new google.maps.GroundOverlay(overlayImage, imageBounds);
    overlay.setMap(map);
}
