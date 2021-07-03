const router = require('express').Router()
const homepageRoutes = require('./homepage-routes')
const profileRoutes = require('./profile-routes')
const uploadRoutes = require('./upload')

router.use('/homepage', homepageRoutes)

router.use('/profile', profileRoutes)

router.use('/uploadRoutes', uploadRoutes)

module.exports = router
