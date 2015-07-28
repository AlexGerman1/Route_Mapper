var favorites = [];
var btn = document.getElementById('btn');

btn.addEventListener("click", function(){
  var f =  document.getElementById("newFavorite").value;
  console.log(favorites + " event listener");
    if(localStorage.getItem('newFavorite')) {
      favorites.push(f);
      populateFavorites();
    } else {
      console.log(f);
      favorites.push(f);
      populateFavorites();
    }
});

function populateFavorites(){
  localStorage.setItem('newFavorite', favorites);
  console.log('populated');
}

function retrieveFavorites(){
  localStorage.getItem('newFavorite');
  console.log('retrived');
}
