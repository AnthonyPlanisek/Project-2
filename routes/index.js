const router = require('express').Router()
const apiRoutes = require('./api')
// const { auth } = require('express-openid-connect')

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

router.use('/api', apiRoutes)

router.use((req, res) => {
  res.send('<h1>Wrong Route!</h1>')
})

module.exports = router
