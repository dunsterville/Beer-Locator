/***************
* Variables
***************/


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
    //createCard(data,url)
    // Call function to update breweries display
    data.forEach(element => {
      let imageURL

      // If Website URL exists
      if (element.website_url) {
        // Get openGraph info
        fetch(`http://opengraph.io/api/1.0/site/${element.website_url.replace('://', '%3A%2F%2F')}?accept_lang=auto&app_id=bfb5f20f-f950-4486-9c7d-c87131eb839b`)
        .then(r => r.json())
        .then(data => {
          imageURL = data.openGraph.image.url
          console.log(data, imageURL)
          if (!imageURL) {
            fetch('https://api.unsplash.com/search/photos?query=beer&per_page=1', {
              headers: {
                Authorization: 'Client-ID 2e1202d57a36ed3893ec09b84050dfd47feca6aa3d50d47ee3f397928fc2f3a2'
              }
            })
            .then(r => r.json())
            .then(data => {
              console.log(data)
              imageURL = data.results[0].urls.full
            })
          } 
        })
        .catch(err => console.log(err))
      } else {
        fetch('https://api.unsplash.com/search/photos?query=beer&per_page=1', {
          headers: {
            Authorization: 'Client-ID 2e1202d57a36ed3893ec09b84050dfd47feca6aa3d50d47ee3f397928fc2f3a2'
          }
        })
        .then(r => r.json())
        .then(data => {
          console.log(data)
          imageURL = data.results[0].urls.full
        })
      }
    })
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

//navbar functionality
$(document).ready(function(){ //When the document's loaded, it'll be ready for menu icon click
    $('.sidenav').sidenav()
})


getGeoLocation()

