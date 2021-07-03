const express = require('express')
const router = express.Router()
const homeController = require('../controller/home')
const uploadController = require('../controller/upload')
const upload = require('../middleware/middleware')

router.get('/', homeController.getHome)

router.post('/upload', upload.single('file'), uploadController.uploadFiles)

router.use('/upload', router)

module.exports = router
