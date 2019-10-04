// javaScript for beerUs page

// going to call giphy api to switch random drinking giphs.

const swap = _ => {
  document.addEventListener('click', e => {

    if (e.target.className === 'responsive-img') {
      loadSound()
      playSound()
      const originalPix = e.target.src
      fetch('https://api.giphy.com/v1/gifs/random?api_key=v0XH9p1RzYylQrnvVVgzOOhUSb88UqeQ&tag=drinking-cheers')
        .then(r => r.json())
        .then(gifs => {
          document.getElementById(e.target.id).src = gifs.data.images.original.url
          setTimeout(function () {
            document.getElementById(e.target.id).src = originalPix
          }, 5000)
        })
        .catch(e => console.log(e))
    }
  })
}
swap()

// calls a random joke
const jokeGenerator = setInterval(() => {
  randomJoke()
}, 15000)

const randomJoke = _ => {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(r => r.json())
    .then(joke => {
      const setUp = document.getElementById('randomJoke')
      const punchLine = document.getElementById('punchLine')
      setUp.textContent = `${joke.setup}`
      punchLine.textContent = `${joke.punchline}`
    })
}
randomJoke()

// sound function when user clicks image from createjs.com
var soundID = 'beer'

const loadSound = _ => createjs.Sound.registerSound('./assets/images/beer.mp3', soundID)


let playSound = _ =>playSound createjs.Sound.play(soundID)
