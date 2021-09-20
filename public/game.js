// let gameScore
const xhr = new XMLHttpRequest()
xhr.withCredentials = true

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    const parsedData = JSON.parse(this.responseText)
    console.log('!!!!!', parsedData)
    console.log(parsedData.userInfo)
    console.log(parsedData.userInfo.userName)
    exampleName = parsedData.userInfo.userName
    gameScore = parsedData.userInfo.userScore
    document.getElementById('welcomeCardname').innerHTML = exampleName
    // document.getElementById('score').innerHTML = gameScore
  }
})
xhr.open('GET', 'https://map-marauders.herokuapp.com/authuser') // change to heroku
xhr.send()
