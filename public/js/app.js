var favorites = [];
var btn = document.getElementById('btn');
console.log(btn);
btn.addEventListener("click", function(){
  var f =  document.getElementById("newFavorite").value;
  console.log(favorites + " event listener");
  favorites.push(f);
  // console.log('clicked')
  var favoriteIn = [favorites];
  localStorage["favoriteIn"] = JSON.stringify(favoriteIn)
});
//   if(!localStorage.getItem('newFavorite')) {
//   populateFavorites();
// } else {
//   retrieveFavorites();
// }
function populateFavorites(){
  localStorage.setItem('newFavorite', JSON.stringify(favorites));
  retrieveFavorites();
}
function retrieveFavorites(){
  favorites = JSON.parse(localStorage['newFavorite']);
  console.log(favorites + " from local storage");
}
