var favorites = [];
var btn = document.getElementById('favoriteButton');
var f;

favoriteButton.addEventListener("click", function(){
  f =  document.getElementById("favoriteRoute").value;
  console.log(favorites + " event listener");
      if(!(checkForDuplicate(f, favorites))){
        if (f === '') {
          console.log('you did not enter a value');
        }
      else if(localStorage.getItem('favoriteRoute')) {

      favorites.push(f);
      populateFavorites();
      renderNewRow();
    } else {
      console.log(f);
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
  console.log('populated');
}
function retrieveFavorites(){
  var retrievedData = localStorage.getItem('favoriteRoute');
  if(retrievedData){
    favorites = JSON.parse(retrievedData);
  }
  // console.log('retrieved ' + favorites);
}
retrieveFavorites();
