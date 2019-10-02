// javaScript for beerUs page

// going to call giphy api to switch random drinking giphs.

const swap = _ => {
  document.addEventListener('click', e => {
    if (e.target.className === 'responsive-img') {

      fetch('http://api.giphy.com/v1/gifs/random?api_key=v0XH9p1RzYylQrnvVVgzOOhUSb88UqeQ&tag=drinking-cheers')
        .then(r => r.json())
        .then(gifs => {
          document.getElementById(e.target.id).src = gifs.data.images.original.url
        })
        .catch(e => console.log(e))
    }
  })
}
swap()

// calls a random joke
const jokeGenerator = setInterval(() => {
  randomJoke()
}, 10000)

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
