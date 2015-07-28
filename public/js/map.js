var mapController = new Object();

// colors that will be used on the map
mapController.colorArray = [{inUse: false, color: "#0000FF"}, // blue 
                            {inUse: false, color: "#FF0000"}, // red
                            {inUse: false, color: "#008000"}, // green
                            {inUse: false, color: "#FFA500"}, // orange
                            {inUse: false, color: "#800080"}]; // purple

mapController.displayedMapLayers = [];

mapController.map = L.map('map').setView([47.61, -122.33], 13);

//use this code for pretty map tiles from Mapbox
//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//    maxZoom: 18,
//    //id: 'mringel.9a3079e3',
//    id: 'mapbox.emerald'
//    accessToken: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA'
//}).addTo(mapController.map);


// Use this code for ugly map tiles straight from OSM
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mapController.map);

// finds a color that's not in use.  If all colors are in
// use, returns black.
mapController.findColor = function() {
  for (var i = 0; i < this.colorArray.length; i++) {
    if (this.colorArray[i].inUse === false) {
      this.colorArray[i].inUse = true;
      return this.colorArray[i].color;
    }
    };
    return "#000000";
};

// function to seach all routes in the geoJSON data for a route 
// based on the route number.  Returns the route geoJSON object
mapController.searchRoute = function(number) {
  for (var i = 0; i < routes.features.length; i++) {
    if (routes.features[i].properties.ROUTE == number) {
      return routes.features[i];
    }
  };
  alert( "no such route found");
};  // close  search function

// adds a route to the map
mapController.addRoute = function (routeObject) {
  // find a color that isn't being used
  if (typeof routeObject === "object") {
    routeColor = this.findColor();
    routeObject.properties.color = routeColor;
  
    // convert geoJSON to leaflet layer
    var routeLayer = L.geoJson(routeObject, {
      style: {"color": routeColor},
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Route: " + feature.properties.ROUTE);
      }   
    })  

    // store both the geojson route and the leaflet layer in an array for later reference
    var combinedObject = { routeObject: routeObject, layerObject: routeLayer};
    this.displayedMapLayers.push(combinedObject);
    
    //add the new route to the layercontrols
    this.updateLayerControls(routeLayer, routeObject.properties.ROUTE);
  
    // call function to update displayed table
    // ------------ here ------------
    routeLayer.addTo(this.map);
    this.map.fitBounds(routeLayer);
  }
}; // close addRoute function

mapController.setColorAvailable = function(color) {
  for (var i = 0; i < this.colorArray.length; i++) {
    if (this.colorArray[i].color == color) {
      this.colorArray[i].inUse = false;
    }
  };
}

//get layerObject based on route number
mapController.getLayerObject = function(getroute) {
  for (var i = 0; i < this.displayedMapLayers.length; i++) {
    if (this.displayedMapLayers[i].routeObject.properties.ROUTE == getroute) {
      return this.displayedMapLayers[i].layerObject;
    }
  };
}

// removeRoute requires a layerObject, obtained from displayedMapLayersArray
mapController.removeRoute = function (layerObject, stringName) {
  this.map.removeLayer(layerObject);
  this.layersControl.removeLayer(layerObject, stringName);

  // remove it from the array of displayed maps
  for (var i = 0; i < this.displayedMapLayers.length; i++) {
    if (this.displayedMapLayers[i].layerObject === layerObject) {
      var layerColor = this.displayedMapLayers[i].routeObject.properties.color;
      this.setColorAvailable(layerColor);
      this.displayedMapLayers.splice(i,1);
    }
  };
  // and remove it from the displayed table
  // --------   here -------------
}; // close remove function

mapController.overlayMaps = {};
mapController.layersControl;

mapController.updateLayerControls = function (layerObject, stringName) {
  //if this is the first layer added, create the control
  if (this.displayedMapLayers.length == 1) {
    var key = this.displayedMapLayers[0].routeObject.properties.ROUTE;
    this.overlayMaps[key] = this.displayedMapLayers[0].layerObject;
    this.layersControl = new L.control.layers({},this.overlayMaps).addTo(this.map);
  }
  else {
    this.layersControl.addOverlay(layerObject, stringName)
  }
  
};

mapController.addNew = function(event) {
  event.preventDefault();
  var routeNumber = document.getElementById('routeSearch').value;
  var routeObject = mapController.searchRoute(routeNumber);
  mapController.addRoute(routeObject);
};

var searchForm = document.getElementById('routeConnector');
searchForm.addEventListener('submit', mapController.addNew, false);



//test code to set up some routes for testing

// var test = mapController.searchRoute(36);
// mapController.addRoute(test);

// var test2 = mapController.searchRoute(40);
// mapController.addRoute(test2);

// var test3 = mapController.searchRoute(70);
// mapController.addRoute(test3);
