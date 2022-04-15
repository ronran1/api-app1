//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  document.querySelector('h2').innerText = `Loading ${choice} price, wait 10 seconds...`
  setTimeout(() => document.querySelector('h2').innerText = `Did you know that ${choice} price will self-update every 10 seconds?`
  , 5000)
  console.log(choice)
  const url = `https://api.coincap.io/v2/assets/${choice}`
  setInterval(() => {
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('h2').innerText = `Price of ${data.data.name}: ${Number(data.data.priceUsd).toFixed(2)}`

    })
    .catch(err => {
        console.log(`error ${err}`)
    })}, 10000)
}

