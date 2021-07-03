const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const uploadController = require('../controllers/upload')
const upload = require('../middleware/upload')

const routes = (app) => {
  router.get('/upload', homeController.getHome)

  router.post('/upload', upload.single('file'), uploadController.uploadFiles)

  return app.use('/upload', router)
}

module.exports = routes
