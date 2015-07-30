var favorites = [];
var favoriteButton = document.getElementById('addToFavorites');
var f;

favoriteButton.addEventListener("submit", function(e) {
  e.preventDefault();
  f =  document.getElementById("addFavorite").value;
  favoriteButton.reset();

      if(!(checkForDuplicate(f, favorites))){
        if (f === '') {
          // console.log('you did not enter a value');
        }
      else if(localStorage.getItem('favoriteRoute')) {

      favorites.push(f);
      populateFavorites();
      renderNewRow();
    } else {
      favorites.push(f);
      populateFavorites();
      renderNewRow();
    }
  }
});

function checkForDuplicate(item, ary){
  for(var i = 0; i < ary.length; i++){
    if(item === ary[i]) return true;
  }
  return false;
}
function populateFavorites(){
  localStorage.setItem('favoriteRoute', JSON.stringify(favorites));
}
function retrieveFavorites(){
  var retrievedData = localStorage.getItem('favoriteRoute');
  if(retrievedData){
    favorites = JSON.parse(retrievedData);
  }
}
retrieveFavorites();
