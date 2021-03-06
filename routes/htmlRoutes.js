const router = require('express').Router()
const path = require('path')
const express = require('express')
const app = express()

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile')
    } else {
      res.render('register')
    }
  })

  router.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'chat.html'))
  })

  router.get('/authuser', (req, res) => {
    // console.log('hello', req.session.passport.user)
    db.User.findOne({
      where: {
        id: req.session.passport.user.id
      }
    }).then((result) => {
      console.log('///////', result)
      const user = {
        userInfo: result
      }
      res.json(user)
    })
  })
  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        }
        res.render('profile', user)
      })
    } else {
      res.redirect('/')
    }
  })
  // Load Main chat page
  router.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'chat.html'))
  })

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.sendFile(path.join(__dirname, '../views', 'game.bootstrap.html'))
    } else {
      res.render('register')
    }
  })

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.sendFile(path.join(__dirname, '../views', 'game.bootstrap.html'))
    } else {
      res.render('/register')
    }
  })

  router.get('/game', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.sendFile(path.join(__dirname, '../public', 'chat.html'))
    } else {
      res.render('/register')
    }
  })

  // Load example index page
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbExamples) {
        res.render('example', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          examples: dbExamples
        })
      })
    } else {
      res.redirect('/')
    }
  })

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        })
      })
    } else {
      res.redirect('/')
    }
  })

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout()
    req.session.destroy((err) => {
      if (err) {
        return next(err)
      }
      res.clearCookie('connect.sid', { path: '/' })
      res.redirect('/')
    })
  })

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404')
  })

  return router
}
