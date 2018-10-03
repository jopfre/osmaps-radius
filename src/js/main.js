var map = L.map('mapid').setView([51.505, -0.09], 10);
var radiusInput = document.querySelector('#radiusInput');
var unitSelector = document.querySelector('#unitSelector');

var  earthRadii = {
  // The radius of the earth in various units
  mi: 3963.1676,
  km: 6378.1,
  ft: 20925524.9,
  mt: 6378100,
  in: 251106299,
  yd: 6975174.98,
  fa: 3487587.49,
  na: 3443.89849,
  ch: 317053.408,
  rd: 1268213.63,
  fr: 31705.3408
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.Control.geocoder({
  defaultMarkGeocode: false
}).on('markgeocode', function(e) {
	var bbox = e.geocode.bbox;
	var poly = L.polygon([
		bbox.getSouthEast(),
		bbox.getNorthEast(),
		bbox.getNorthWest(),
		bbox.getSouthWest()
	]);
	map.fitBounds(poly.getBounds());
}).addTo(map);

map.on('click', function(event) {
  var radius = (radiusInput.value / earthRadii[unitSelector.value]) * earthRadii['mt'];
  var circle = L.circle(event.latlng, {
	  color: '#6593f1',
	  fillColor: '#bacff9',
	  fillOpacity: 0.5,
	  radius: radius
	}).addTo(map);
	circle.addEventListener('contextmenu', function() {
		map.removeLayer(this);
	});
});

