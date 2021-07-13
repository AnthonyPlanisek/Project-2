const xhr = new XMLHttpRequest()
xhr.withCredentials = true

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    const parsedData = JSON.parse(this.responseText)
    console.log('!!!!!', parsedData)
    console.log(parsedData.userInfo)
    console.log(parsedData.userInfo.userName)
    exampleName = parsedData.userInfo.userName
    document.getElementById('welcomeCardname').innerHTML = exampleName
  }
})
xhr.open('GET', 'http://localhost:3333/authuser') // change to heroku
xhr.send()
