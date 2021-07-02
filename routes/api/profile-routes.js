const { requiresAuth } = require('express-openid-connect')

const router = require('express').Router()

router.get('/', requiresAuth(), (req, res) => {
//   console.log('odic!!!!', req.oidc)
  res.send(JSON.stringify(req.oidc.user))
})

module.exports = router
