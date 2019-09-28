/***************
* Variables
***************/


let cityname //pass a city name into this var later.
// geoLocation variables
let userLatitude,
  userLongitude,
  errorMessage


/***************
* Fetch Requests
***************/

const getBreweries = (cityname) => {
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityname}`)
  .then(r => r.json())
  .then(data => {
    console.log(data)
    // Call function to update breweries display
  })
  .catch(err => console.log(err))
}

const getCity = (latitude, longitude) => {
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d62fec397ede46c28c554363b73c4563`)
  .then(r => r.json())
  .then(data => {
    console.log (data.results[0].components.city)
    // Get Breweries
    getBreweries(data.results[0].components.city)
  })
  .catch(err => console.log(err))
}




/***************
* Functions
***************/


const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(grabLocation, locationError)
  } else { 
    // Geolocation not supported
    errorMessage = 'Geolocation is not supported by this browser.'
  }
}

const grabLocation = (position) => {
  // Grab position
  userLatitude = position.coords.latitude
  userLongitude = position.coords.longitude
  getCity(userLatitude, userLongitude)
}

const locationError = (error) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = 'User denied the request for Geolocation.'
      break
    case error.POSITION_UNAVAILABLE:
      errorMessage = 'Location information is unavailable.'
      break
    case error.TIMEOUT:
      errorMessage = 'The request to get user location timed out.'
      break
    case error.UNKNOWN_ERROR:
      errorMessage = 'An unknown error occurred.'
      break
  }
  console.log(errorMessage)
}

getGeoLocation()

