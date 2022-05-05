//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
let intervalId = null
let controller = null
function allStorage() {
  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
  }
  for (i in values) {
    let para = document.createElement('p')
    para.innerHTML = values[i]
    document.querySelector('.container').appendChild(para)
    console.log(values[i])
  }
}
allStorage()

function getFetch(){
  let coinName = null
  let coinPrice = null
  if (controller) {
    controller.abort()
    clearInterval(intervalId)
  }
  controller = new AbortController();
  const choice = document.querySelector('input').value
  document.querySelector('h2').innerText = `Loading ${choice} price, wait 10 seconds...`
  setTimeout(() => document.querySelector('h2').innerText = `Did you know that ${choice} price will self-update every 10 seconds?`
  , 5000)
  console.log(choice)
  const url = `https://api.coincap.io/v2/assets/${choice}`
  intervalId = setInterval(() => {
  fetch(url, {
    signal: controller.signal
  })
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      coinName = data.data.name
      coinPrice = Number(data.data.priceUsd).toFixed(2)
      document.querySelector('h2').innerText = `Price of ${coinName}: ${Number(coinPrice).toFixed(2)}`
      document.querySelector('h3').innerText = `VWAP of ${coinName}: ${Number(data.data.vwap24Hr).toFixed(2)}`
      if (window.localStorage.getItem(coinName)) {
        window.localStorage.removeItem(coinName)
      }
      window.localStorage.setItem(coinName, `${coinName}: ${coinPrice}`)
    })
    .catch(err => {
        console.log(`error ${err}`)
    })}, 10000)
}

