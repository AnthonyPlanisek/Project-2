// eslint-disable-next-line no-undef
// const db = require('./models')
// const axios = require('axios')
const socket = io()
let exampleName
const xhr = new XMLHttpRequest()
xhr.withCredentials = true

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    const parsedData = JSON.parse(this.responseText)
    console.log('!!!!!', parsedData)
    console.log(parsedData.userInfo)
    console.log(parsedData.userInfo.userName)
    exampleName = parsedData.userInfo.userName
    document.getElementById('profileName').innerHTML = exampleName
  }
})

const cities = [
  [{ lat: 40.7580, lng: -73.9855 }, { city: 'New York' }],
  [{ lat: 34.0430, lng: -118.2673 }, { city: 'Los Angeles' }],
  [{ lat: 41.8827, lng: -87.6233 }, { city: 'Chicago' }],
  [{ lat: 25.7907, lng: -80.1300 }, { city: 'Miami' }],
  [{ lat: 32.7473, lng: -97.0945 }, { city: 'Dallas' }],
  [{ lat: 39.9496, lng: -75.1503 }, { city: 'Philadelphia' }],
  [{ lat: 29.5518, lng: -95.0981 }, { city: 'Houston' }],
  [{ lat: 33.7618, lng: -84.3945 }, { city: 'Atlanta' }],
  [{ lat: 38.8893, lng: -77.0502 }, { city: 'Washington' }],
  [{ lat: 42.3601, lng: -71.0942 }, { city: 'Boston' }],
  [{ lat: 33.4453, lng: -112.0667 }, { city: 'Phoenix' }],
  [{ lat: 47.6205, lng: -122.3493 }, { city: 'Seattle' }],
  [{ lat: 37.8199, lng: -122.4783 }, { city: 'San Francisco' }],
  [{ lat: 42.3385, lng: -83.0524 }, { city: 'Detroit' }],
  [{ lat: 32.7137, lng: -117.1751 }, { city: 'San Diego' }],
  [{ lat: 44.9736, lng: -93.2575 }, { city: 'Minneapolis' }],
  [{ lat: 27.9759, lng: -82.5033 }, { city: 'Tampa' }]
]

const currentPlace = cities[Math.floor(Math.random() * (cities.length))] // Pick a random place to be spawned
const coordinates = currentPlace[0] // Get coordinates
console.log('test', coordinates)
console.log('????', currentPlace)
console.log('1', currentPlace[1].city)
const correctCity = currentPlace[1].city
console.log('lower', correctCity.toLowerCase())
xhr.open('GET', 'http://localhost:3333/authuser') // change to heroku
xhr.send()
const dom = {
  nameInput: document.querySelector('.name-input'),
  joinButton: document.querySelector('.join'),
  inputAvatar: document.querySelector('.messaging-form .avatar'),
  welcomeMessage: document.querySelector('h1'),
  feed: document.querySelector('.feed'),
  feedback: document.querySelector('.feedback')
}

const user = {
  name: null,
  avatar: null
}

const getAvatar = () => {
  const size = Math.floor(Math.random() * 100) + 25
  // replace URL with Database ID for avatar
  return `url(https://i.pravatar.cc/300${size}/${size})`
}
// actual chat message block being entered
const addEntry = ({ user, message }, you) => {
  const entry = document.createElement('li')
  const date = new Date()

  entry.classList = `message-entry${you ? ' message-entry-own' : ''}`
  entry.innerHTML = `
        <span class="avatar" style="background: ${user.avatar}; background-size: contain;"></span>
        <div class="message-body">
            <span class="user-name">${you ? 'You' : user.name}</span>
            <time>@ ${date.getHours()}:${date.getMinutes()}</time>
            <p>${message}</p>
        </div>
    `
  console.log('!!!!!!', message)
  if (message === correctCity.toLowerCase()) {
    console.log('one point')

    // $.ajax({ method: 'POST', url: '/increasescore', data: { userId: 1 } })
  }

  dom.feed.appendChild(entry)
  const elmnt = document.getElementsByClassName('feed')
  const yaxis = elmnt[0].scrollTop
  const newaxis = yaxis + 100
  elmnt[0].scrollTop = newaxis
}

const addWelcomeMessage = (user, you) => {
  const welcomeMessage = document.createElement('li')
  const message = you
    ? 'You have joined the game'
    : `<span class="user-name">${exampleName}</span> has joined the game`

  const avatar = you ? '' : `<span class="avatar" style="background: ${user.avatar}; background-size: contain;"></span>`

  welcomeMessage.classList = 'welcome-message'
  welcomeMessage.innerHTML = `
        <hr />
        <div class="welcome-message-text">
            ${avatar}
            ${message}
        </div>
    `

  dom.feed.appendChild(welcomeMessage)
}

const enterChannel = async () => {
  const avatar = getAvatar()
  console.log(exampleName)
  dom.joinButton.remove()
  dom.welcomeMessage.remove()

  dom.nameInput.value = ''
  dom.nameInput.placeholder = 'Send a message for the channel...'

  dom.inputAvatar.innerText = ''
  dom.inputAvatar.style.backgroundImage = avatar
  dom.inputAvatar.style.backgroundSize = 'contain'

  user.name = exampleName
  user.avatar = avatar

  addWelcomeMessage({ avatar }, true)

  socket.emit('user connected', {
    exampleName,
    avatar
  })
}

socket.on('user connected', payload => {
  console.log('New user connected', payload)
  addWelcomeMessage(payload, false)
})

socket.on('user typing', ({ user, typers }) => {
  dom.feedback.innerHTML = typers > 1 ? 'Several people are typing' : `<i>${user}</i> is typing`
})

socket.on('user stopped typing', typers => {
  if (!typers) {
    dom.feedback.innerHTML = ''
  }
})

socket.on('send message', payload => {
  addEntry(payload)

  if (!payload.typers) {
    dom.feedback.innerHTML = ''
  }
})

dom.joinButton.onclick = e => {
  e.preventDefault()

  if (!dom.nameInput.value) {
    dom.nameInput.parentElement.classList.add('error')
  } else {
    enterChannel()

    dom.nameInput.onkeyup = e => {
      socket.emit('user typing')

      // If user presses enter
      if (e.keyCode === 13) {
        const message = e.target.value

        socket.emit('send message', {
          message,
          user
        })

        addEntry({ user, message }, true)

        e.target.value = ''
      }

      if (e.target.value === '') {
        socket.emit('user stopped typing')
      }
    }
  }
}

// make chat area draggable
dragElement(document.getElementById('mydiv'))

function dragElement (elmnt) {
  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
  if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the DIV
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  function closeDragElement () {
    /* stop moving when mouse button is released: */
    document.onmouseup = null
    document.onmousemove = null
  }
}
