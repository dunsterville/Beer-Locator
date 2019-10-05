/***************
* Variables
***************/


// geoLocation variables
let userLatitude,
  userLongitude,
  errorMessage,
  city,
  state,
  zip
 


/***************
* Fetch Requests
***************/

const getBreweries = (cityName) => {
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${cityName}`)
  .then(r => r.json())
  .then(data => {
    city = cityName
    let cityDiv = document.createElement('div')
    cityDiv.id = city
    cityDiv.className = 'row city'
    cityDiv.innerHTML = `<h4>Breweries located near ${city}</h4>`
    document.getElementById('cards').prepend(cityDiv)
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
    // Set variables
    city = data.results[0].components.city
    state = data.results[0].components.state_code
    zip = data.results[0].components.postcode
    // Get Breweries
    getBreweries(data.results[0].components.city)
  })
  .catch(err => console.log(err))
}


const getUnsplash = (breweriesData) => {
  // fetch('https://api.unsplash.com/photos/random?query=beer&orientation=landscape', {
  //   headers: {
  //     Authorization: 'Client-ID 2e1202d57a36ed3893ec09b84050dfd47feca6aa3d50d47ee3f397928fc2f3a2'
  //   }
  // })
  // .then(r => r.json())
  // .then(data => {
  //   console.log(data)
  //   let image = data.urls.small
  //   createCard(breweriesData, image)
  //})
  createCard(breweriesData, 'https://images.unsplash.com/photo-1504502350688-00f5d59bbdeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjY1MzYyfQ') 
}


/***************
* Functions
***************/

const createCard = (data, url) => {
  let card = document.createElement('div')
  card.className = 'col s12 m6 xl4'
  card.innerHTML = `
    <div class="card animated rotateInUpRight">
      <div class="card-image">
        <img src="${url}" class="responsive-img">
      </div>
      <div class="card-content">
        <span class="card-title">${data.name}</span>
        <p>Address: <a href="https://www.google.com/maps/place/${data.street},+${city},+${state}+${zip}" target="_blank">${data.street}</a></p>
        <p>Phone: <a href="tel:${data.phone}">${data.phone}</a></p>
        <a class="website" target="_blank" href="${data.website_url}">${data.website_url}</a>
      </div>
    </div>
  `
  document.getElementById(city).append(card)
}

const getGeoLocation = () => {
  if (navigator.geolocation) {
    if (sessionStorage.getItem('longitude')) { //runs getCity if longitude exists in sessionstorage
      getCity(sessionStorage.getItem('latitude'), sessionStorage.getItem('longitude'))
    } else {  //asks for location iff sessionstorage lacks longitude
    navigator.geolocation.getCurrentPosition(grabLocation, locationError)
    }
  } else { 
    // Geolocation not supported
    errorMessage = 'Geolocation is not supported by this browser.'
  }
}

const grabLocation = (position) => {
  // Grab position
  userLatitude = position.coords.latitude
  userLongitude = position.coords.longitude
  sessionStorage.setItem(`latitude`,`${userLatitude}`) //Updated to store lat/long into sessionstorage
  sessionStorage.setItem(`longitude`,`${userLongitude}`)
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

// Google Maps
let placeSearch, 
  autocomplete

const componentForm = {
  street_number: 'long_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
  country: 'long_name',
  postal_code: 'long_name'
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /* @type {!HTMLInputElement} */(document.getElementById('search')),
      {types: ['(cities)']})

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', stripToCity)
}

const stripToCity = () => {
  // Get the place details from the autocomplete object.
  let place = autocomplete.getPlace()

  // Remove everything but city
  document.getElementById('search').value = place.address_components[0][componentForm[place.address_components[0].types[0]]]
  // Run getBreweries
  getBreweries(document.getElementById('search').value)
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

document.getElementById('search').addEventListener('keypress', e => {
  if ( e.which == 13 ) e.preventDefault();
})



getGeoLocation()

