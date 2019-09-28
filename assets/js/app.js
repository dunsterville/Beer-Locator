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


  fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityname}`)
  .then(r => r.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => {console.log(err)})






/***************
* Functions
***************/


const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(grabLocation, locationError)
  } else { 
    // Error Handler
    errorMessage = 'Geolocation is not supported by this browser.'
  }
}

const grabLocation = (position) => {
  // Grab position
  userLatitude = position.coords.latitude
  userLongitude = position.coords.longitude
  console.log(userLatitude, userLongitude)
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
