const router = require('express').Router()
const homepageRoutes = require('./homepage-routes')
router.use('/homepage', homepageRoutes)

module.exports = router
