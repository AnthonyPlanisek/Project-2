const router = require('express').Router()
const ensureAuthenticated = require('../middleware/ensureAuthenticated')
// const User = require('../models/user')
let random = Math.floor(Math.random() * (3))
// console.log('////////////', random)
module.exports = (passport, db) => {
  const AuthController = require('../controller/authController')(passport, db)
  const AppController = require('../controller/appController')(db)

  // Authentication
  router.post('/register', AuthController.register)
  router.post('/login', AuthController.login)
  router.get('/logout', AuthController.logout)
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser)
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser)
  router.post('/user/confirm', AuthController.confirmAuth)

  // App
  router.get('/examples', AppController.getExamples)
  router.post('/examples', AppController.createExample)
  router.delete('/examples/:id', AppController.deleteExample)

  router.post('/increasescore', (req, res) => {
    console.log('TESTING', req.session.passport.user)
    db.User.findOne({ where: { id: req.session.passport.user.id } }).then(result => {
    // User.update({ userScore: +1 }, {
      //   where: {
      //     userID: 1
      //   }
      // })
      const newScore = parseInt(result.userScore) + 1
      // console.log('newscore', newScore)
      // console.log('res', result)
      db.User.update({
        userScore: newScore
      }, {
        where: { id: req.session.passport.user.id }
      }).then(result => {
        // console.log(result)
        res.json(result)
      })
    })
  })

  router.get('/location', (req, res) => {
    db.Location.findOne({ where: { id: random } }).then(result => {
      console.log('result Location!?', result)
      res.json(result)
    })
  })

  return router
}
