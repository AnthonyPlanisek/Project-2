const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/upload')
const upload = require('../middleware/upload')

const routes = (app) => {
  router.post('/upload', upload.single('file'), uploadController.uploadFiles)

  return router.use('/upload', router)
}

module.exports = routes
