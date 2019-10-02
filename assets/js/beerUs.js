// javaScript for beerUs page

// going to call giphy api to switch random drinking giphs.

const swap = function () {
  fetch('http://api.giphy.com/v1/gifs/random?api_key=v0XH9p1RzYylQrnvVVgzOOhUSb88UqeQ&tag=drinking')
    .then(r => r.json())
    .then(gifs => {

    })
    .catch(e => console.log(e))
}

swap()
