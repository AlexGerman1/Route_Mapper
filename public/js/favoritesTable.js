//Table to store favorite routes

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
  head2.innerHTML = 'Remove';
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

var tableHead = new FavoritesTable ();
tableHead.header();

var bus1 = new FavoritesTable (67, 3);
var bus2 = new FavoritesTable (34, 4);
var bus3 = new FavoritesTable (49, 5);
bus1.newRow();
bus2.newRow();
bus3.newRow();

