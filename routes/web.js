const express = require('express')
const router = express.Router()
const uploadController = require('../controller/upload')
const upload = require('../middleware/middleware')

const routes = (app) => {
  router.put('/upload', upload.single('file'), uploadController.uploadFiles)

  return router.use('/upload', router)
}

module.exports = routes
