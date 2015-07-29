// this adds rows to a table

var Table = function(routeNumber, color) {
  this.routeNumber = routeNumber;
  this.color = color;

};

Table.prototype.header = function() {
  var table = document.getElementById('table');
  var tableHead = table.createTHead();
  tableHead.id = 'Head';
  var row = tableHead.insertRow();
  var head1 = row.insertCell();
  var head2 = row.insertCell();
  var head3 = row.insertCell();

  head1.innerHTML = 'Route';
  head2.innerHTML = 'Color';
  head3.innerHTML = '';
}

Table.prototype.newRow = function() {
  var table = document.getElementById('table');
  var tableBody = table.createTBody();
  tableBody.id = 'Body';
  var row = tableBody.insertRow();
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  cell2.style.backgroundColor = this.color;
  var cell3 = row.insertCell();

  cell1.innerHTML = this.routeNumber;
  cell3.innerHTML = '<input type="button" value="Delete" id="deleteButton' + this.routeNumber + '">';

  var deleteListener = document.getElementById('deleteButton' + this.routeNumber);
  var routeNumber = this.routeNumber
  deleteListener.addEventListener('click', function(){
    var tableBodyToBeDeleted = deleteListener.parentNode.parentNode.parentNode;
    var containerEl = tableBodyToBeDeleted.parentNode;
    containerEl.removeChild(tableBodyToBeDeleted);
    var layer = mapController.getLayerObject(routeNumber);
    mapController.removeRoute(layer, routeNumber);
  })

}; // close newRow function




var tableHead = new Table ();
tableHead.header();

function generateNewRow(routeNumber, color) {
  var addRow = new Table (routeNumber, color);
  addRow.newRow();
}

// var bus1 = new Table (67, '#458B00');
// var bus2 = new Table (34, '#00B2EE');
// var bus3 = new Table (49, '#EEEE00');
// bus1.newRow();
// bus2.newRow();
// bus3.newRow();

