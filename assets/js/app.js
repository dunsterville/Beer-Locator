let cityname //pass a city name into this var later.
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityname}`)
  .then(r => r.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => {console.log(err)})

let latitude // will recieve from brewery api
let longitude // will recieve from brewery api
fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d62fec397ede46c28c554363b73c4563`)
  .then(r => r.json())
  .then(data => {
    console.log (data)
  })
  .catch(err => console.log(err))