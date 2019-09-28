//for Materialize's responsive navbar
$(document).ready(function(){ //When the document's loaded, it'll be ready for menu icon click
    $('.sidenav').sidenav()
})

//OpenBrewery fetch request
let cityname //pass a city name into this var later?
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityname}`)
  .then(r => r.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => {console.log(err)})

  