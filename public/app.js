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
  }
})

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

  dom.feed.appendChild(entry)
  const elmnt = document.getElementsByClassName('feed')
  const yaxis = elmnt[0].scrollTop
  const newaxis = yaxis + 100
  elmnt[0].scrollTop = newaxis
}

const addWelcomeMessage = (user, you) => {
  const welcomeMessage = document.createElement('li')
  const message = you
    ? 'You have joined the conversation'
    : `<span class="user-name">${user.name}</span> has joined the conversation`

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
