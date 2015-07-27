// this adds rows to a table

var Table = function(route, color) {
  this.route = route;
  this.color = color;
}

Table.prototype.newRow = function() {
  var tableBody = document.getElementById('tableBody');
  var tr = tableBody.insertRow();
  var td = tr.insertCell();
  tr();
  tr.id = 'rowOne';
  for (var i = 0; i < 3; i++) {
    td();
    td.id = 'cell ' + i;
  }

  var route = document.getElementById('cell 1');
  route.createTextNode(this.route);
  var color = document.getElementById('cell 2');
  color.createTextNode(this.color);
  var del = document.getElementById('cell 3');
  del.createTextNode('delete');
}

var bus = new Table (67, 'green');
bus.newRow();


