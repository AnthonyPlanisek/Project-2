const router = require('express').Router()
const homepageRoutes = require('./homepage-routes')

router.use('/categories', homepageRoutes)

module.exports = router
