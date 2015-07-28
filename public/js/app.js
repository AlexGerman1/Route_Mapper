var favorites = [];
var btn = document.getElementById('btn');

btn.addEventListener("click", function(){
  var f =  document.getElementById("newFavorite").value;
  console.log(favorites + " event listener");
      if(!(checkForDuplicate(f, favorites))){
      if(localStorage.getItem('newFavorite')) {
      favorites.push(f);
      populateFavorites();
    } else {
      console.log(f);
      favorites.push(f);
      populateFavorites();
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
  localStorage.setItem('newFavorite', JSON.stringify(favorites));
  console.log('populated');
}
function retrieveFavorites(){
  var retrievedData = localStorage.getItem('newFavorite');
  if(retrievedData){
    favorites = JSON.parse(retrievedData);
  }
  console.log('retrieved ' + favorites);
}
retrieveFavorites();
