//Table to store favorite routes

var favorites;

//retreive local storage
function retreiveLocalStorage() {
  var retrievedData = localStorage.getItem('favoriteRoute');
  if(retrievedData){
    favorites = JSON.parse(retrievedData);
  }
    console.log('retrieved ' + favorites);
};


//table constructor
var FavoritesTable = function(route, removeIndex) {
  this.route = route;
  this.removeIndex = removeIndex;
};

FavoritesTable.prototype.header = function() {
  var table = document.getElementById('favTable');
  var tableHead = table.createTHead();
  tableHead.id = 'Head';
  var row = tableHead.insertRow();
  var head1 = row.insertCell();
  var head2 = row.insertCell();

  head1.innerHTML = 'Route';
  head2.innerHTML = '';
}

FavoritesTable.prototype.newRow = function() {
  var table = document.getElementById('favTable');
  var tableBody = table.createTBody();
  tableBody.id = 'Body';
  var row = tableBody.insertRow();
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();

  cell1.innerHTML = this.route;
  cell2.innerHTML = '<input type="button" value="Delete" id="deleteButton' + this.removeIndex + '">';

  //could also add an indexing method using this strategy ...
  // left.dataset.number = imgs[2];
  // right.dataset.number = imgs[3];
}

retreiveLocalStorage();

var tableHead = new FavoritesTable ();
tableHead.header();

var i;

function render() {
  for (i = 0; i < favorites.length; i++){
    var temp = new FavoritesTable (favorites[i], i);
    temp.newRow();
  }
};
render();

function renderNewRow() {
  var temp2 = new FavoritesTable (f, i);
  i++;
  temp2.newRow();
}



