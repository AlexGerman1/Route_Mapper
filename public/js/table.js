// this adds rows to a table

var Table = function(route, clr, removeIndex) {
  this.route = route;
  this.clr = clr;
  this.removeIndex = removeIndex;
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
  head3.innerHTML = 'Remove';
}

Table.prototype.newRow = function() {
  var table = document.getElementById('table');
  var tableBody = table.createTBody();
  tableBody.id = 'Body';
  var row = tableBody.insertRow();
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  cell2.style.backgroundColor = this.clr;
  var cell3 = row.insertCell();

  cell1.innerHTML = this.route;
  cell3.innerHTML = '<input type="button" value="Delete" id="deleteButton' + this.removeIndex + '">';

}

var tableHead = new Table ();
tableHead.header();

var bus1 = new Table (67, '#458B00', 7);
var bus2 = new Table (34, '#00B2EE', 8);
var bus3 = new Table (49, '#EEEE00', 9);
bus1.newRow();
bus2.newRow();
bus3.newRow();

