var mapController = new Object();

// colors that will be used on the map
mapController.colorArray = [{inUse: false, color: '#0000FF'}, // blue 
                            {inUse: false, color: '#FF0000'}, // red
                            {inUse: false, color: '#008000'}, // green
                            {inUse: false, color: '#800080'}, // purple
                            {inUse: false, color: '#f0f'}]; // pink

mapController.displayedMapLayers = [];

//instantiate the map and set it to lat/long, zoom level
mapController.map = L.map('map').setView([47.61, -122.33], 12);
mapController.layersControl = new L.control.layers({}, {}).addTo(mapController.map);
//mapController.geocoder = new L.Control.geocoder().addTo(mapController.map);

//use this code for pretty map tiles from Mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   //id: 'mringel.9a3079e3',
   id: 'mapbox.emerald',
   accessToken: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA'
}).addTo(mapController.map);


// Use this code for ugly map tiles straight from OSM
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
//     maxZoom: 18
// }).addTo(mapController.map);

L.Control.geocoder().addTo(mapController.map);

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
  var searchResults = [];
  for (var i = 0; i < routes.features.length; i++) {
    if (routes.features[i].properties.RTE_NUM == number) {
      searchResults.push(routes.features[i]);
    }
  };
  if (searchResults.length != 0) {
    return searchResults;
  } else {
  alert( "No such route found.");
  }
};  // close  search function

// adds a route to the map
mapController.addRoute = function (routeObject) {

  //  logic to check for duplicates here
  if (!(this.checkForDuplicateLayer(routeObject.properties.ROUTE))) {
    if (typeof routeObject === "object") {
      // find a color that isn't being used
      routeColor = this.findColor();
      routeObject.properties.color = routeColor;
    
      // convert geoJSON to leaflet layer
      var routeLayer = L.geoJson(routeObject, {
        style: {"color": routeColor},
        onEachFeature: function (feature, layer) {
          layer.bindPopup("Route: " + feature.properties.RTE_NUM);
        }   
      })  

      // store both the geojson route and the leaflet layer in an array for later reference
      var combinedObject = { routeObject: routeObject, layerObject: routeLayer};
      this.displayedMapLayers.push(combinedObject);
      
      //add the new route to the layercontrols
      this.layersControl.addOverlay(routeLayer, routeObject.properties.ROUTE);

      // call function to update displayed table
      generateNewRow(routeObject.properties.ROUTE, routeColor);
      routeLayer.addTo(this.map);
      this.map.fitBounds(routeLayer);
    }
  }
}; // close addRoute function

mapController.setColorAvailable = function(color) {
  for (var i = 0; i < this.colorArray.length; i++) {
    if (this.colorArray[i].color == color) {
      this.colorArray[i].inUse = false;
    }
  };
}; //close setColor Function

//get layerObject based on route number
mapController.getLayerObject = function(getRouteName) {
  for (var i = 0; i < this.displayedMapLayers.length; i++) {
    if (this.displayedMapLayers[i].routeObject.properties.ROUTE == getRouteName) {
      return this.displayedMapLayers[i].layerObject;
    }
  };
}; //close getLayerObject function

// removeRoute requires a layerObject, obtained from displayedMapLayers Array
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
}; // close remove function

mapController.addFavorites = function () {
  retrieveFavorites();
  for (var i = 0; i < favorites.length; i++) {
    var routeNumber = favorites[i];
    var routeObjectArray = mapController.searchRoute(routeNumber);
    for (var j = 0; j < routeObjectArray.length; j++) {
      mapController.addRoute(routeObjectArray[j])
    };
    //mapController.addRoute(routeObject);
  };
}; // close addFavorites function

// take a number passed by a submit event and add the route to the map
mapController.addNew = function(event) {
  event.preventDefault();
  var routeNumber = document.getElementById('routeSearch').value;
  var routeObjectArray = mapController.searchRoute(routeNumber);
  console.log(routeObjectArray);
  for (var i = 0; i < routeObjectArray.length; i++) {
    console.log("adding route to map");
    mapController.addRoute(routeObjectArray[i]);
  };
  searchForm.reset();
};  // close addNew function

mapController.checkForDuplicateLayer = function(routeName) {
  for (var i = 0; i < this.displayedMapLayers.length; i++) {
    if (routeName == this.displayedMapLayers[i].routeObject.properties.ROUTE) {
      return true;
    }
  };
  return false;
};

function retrieveFavorites(){
  var retrievedData = localStorage.getItem('favoriteRoute');
  if(retrievedData){
    favorites = JSON.parse(retrievedData);
  }
}

var searchForm = document.getElementById('routeConnector');
searchForm.addEventListener('submit', mapController.addNew, false);


var addFavoritesButton = document.getElementById('addFavoritesToMap');
addFavoritesButton.addEventListener('click', mapController.addFavorites, false);

