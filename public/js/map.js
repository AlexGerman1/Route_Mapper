var mapController = new Object();
mapController.colorArray = ["#0000FF", "#FF0000", "#008000", "#FFA500", "#800080"];
//colors in array            [blue,    red,      green,  orange, purple]

mapController.displayedMapLayers = [];

mapController.map = L.map('map').setView([47.61, -122.33], 13);

//use this code for pretty tiles from Mapbox
//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//    maxZoom: 18,
//    //id: 'mringel.9a3079e3',
//    id: 'mapbox.emerald'
//    accessToken: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA'
//}).addTo(mapController.map);


// Use this code for map tiles straight from OSM
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mapController.map);



mapController.searchRoute = function(number) {
  for (var i = 0; i < routes.features.length; i++) {
    if (routes.features[i].properties.ROUTE == number) {
      return routes.features[i];
    }
  };
  return "no such route found";
};  // close function

mapController.addRoute = function (routeObject) {
  var routeColor = this.colorArray[(this.displayedMapLayers.length % 5)];
  var routeLayer = L.geoJson(routeObject, {
    style: {"color": routeColor},
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Route:" + feature.properties.ROUTE);
    }
  });
  this.displayedMapLayers.push(routeLayer);
  // call function to update displayed table
  // ------------ here ------------
  routeLayer.addTo(this.map);
};

mapController.removeRoute = function (routeObject) {
  this.map.removeLayer(routeObject);
  //also remove it from the array of displayed maps
  for (var i = 0; i < this.displayedMapLayers.length; i++) {
    if (this.displayedMapLayers[i] === routeObject) {
      this.displayedMapLayers.splice(i,1);
    }
  };
  // and remove it from the displayed table
  // --------   here -------------
};




