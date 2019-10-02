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
    // For each item in data array
    data.forEach((element, i) => {
      let imageURL
      // set breweriesData at data[i]
      let breweriesData = data[i]
      // If Website URL exists
      if (element.website_url) {
        // Get openGraph info
        // fetch(`https://opengraph.io/api/1.0/site/${element.website_url.replace('://', '%3A%2F%2F')}?accept_lang=auto&app_id=bfb5f20f-f950-4486-9c7d-c87131eb839b`)
        // .then(r => r.json())
        // .then(data => {
        //   // Set imageURL
        //   imageURL = data.openGraph.image.url
        //   // If image url doesn't exist
        //   if (!imageURL) {
        //     // Get an unsplash image
        //     getUnsplash(breweriesData)
        //   } else {
        //     createCard(breweriesData, imageURL)
        //   }
        // })
        // .catch(err => console.log(err))
        getUnsplash(breweriesData)
      } else {
        // Get an unsplash image
        getUnsplash(breweriesData)
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


const getUnsplash = (breweriesData) => {
  fetch('https://api.unsplash.com/photos/random?query=beer', {
    headers: {
      Authorization: 'Client-ID 2e1202d57a36ed3893ec09b84050dfd47feca6aa3d50d47ee3f397928fc2f3a2'
    }
  })
  .then(r => r.json())
  .then(data => {
    console.log(data)
    imageURL = data.urls.small
    createCard(breweriesData, imageURL)
  })
}


/***************
* Functions
***************/

const createCard = (data, url) => {
  let newcard = document.createElement("div")
  newcard.innerHTML = `
  <div class="col s12 m4">
    <div class="card">
      <div class="card-image">
        <img src="${url}" class="responsive-img">
      </div>
      <div class="card-content">
        <span class="card-title">${data.name}</span>
        <p>Address: ${data.street}</p>
        <p>Phone: ${data.phone}</p>
        <a href="${data.website_url}">${data.website_url}</a>
      </div>
    </div>
  </div>
  ` //Need to check parameters later
  document.getElementById("cards").append(newcard)
}

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


/***************
* Event Listener
***************/

document.getElementById('searchBreweries').addEventListener('submit', e => {
  e.preventDefault()
  getBreweries(document.getElementById('search').value)
})

document.getElementById('search').addEventListener('click', () => {
  document.getElementById('search').select()
})

document.getElementById('clearSearch').addEventListener('click', () => {
  document.getElementById('search').value = ''
})



getGeoLocation()

