// javaScript for beerUs page

// going to call giphy api to switch random drinking giphs.

const swap = _ => {
  document.addEventListener('click', e => {
    if (e.target.className === 'responsive-img') {
      const originalPix = e.target.src
      fetch('http://api.giphy.com/v1/gifs/random?api_key=v0XH9p1RzYylQrnvVVgzOOhUSb88UqeQ&tag=drinking-cheers')
        .then(r => r.json())
        .then(gifs => {
          document.getElementById(e.target.id).src = gifs.data.images.original.url
          setTimeout(function () {
            document.getElementById(e.target.id).src = originalPix
          }, 3000)
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

//David's adding logic for # of clicks on each person's picture, stored for Donate page
if (!(localStorage.getItem('cheersCalvin'))){
  localStorage.setItem('cheersCalvin', 0)
}
if (!(localStorage.getItem('cheersDavid'))){
  localStorage.setItem('cheersDavid', 0)
}
if (!(localStorage.getItem('cheersPaul'))){
  localStorage.setItem('cheersPaul', 0)
}
if (!(localStorage.getItem('cheersMichael'))){
  localStorage.setItem('cheersMichael', 0)
}

document.addEventListener('click', e=> {
  if (e.target.id === "calvin") { 
    localStorage.setItem('cheersCalvin' , parseInt(localStorage.getItem('cheersCalvin')) + 1)
    if (parseInt(localStorage.getItem('cheersCalvin')) === 2) {
      M.toast({html: `You've had a few drinks with Calvin. Perhaps thank him by clicking "donate".`})
    }
  } else if (e.target.id === "david") {
    localStorage.setItem('cheersDavid' , parseInt(localStorage.getItem('cheersDavid')) + 1)
    if (parseInt(localStorage.getItem('cheersDavid')) === 2) {
      M.toast({html: `You've had a few drinks with David. Perhaps thank him by clicking "donate".`})
    }
  } else if (e.target.id === "paul") {
    localStorage.setItem('cheersPaul' , parseInt(localStorage.getItem('cheersPaul')) + 1)
    if (parseInt(localStorage.getItem('cheersPaul')) === 2) {
      M.toast({html: `You've had a few drinks with Paul. Perhaps thank him by clicking "donate".`})
    }
  } else if (e.target.id === "michael") {
    localStorage.setItem('cheersMichael' , parseInt(localStorage.getItem('cheersMichael')) + 1)
    if (parseInt(localStorage.getItem('cheersMichael')) === 2) {
      M.toast({html: `You've had a few drinks with Michael. Perhaps thank him by clicking "donate".`})
    }
  }
})