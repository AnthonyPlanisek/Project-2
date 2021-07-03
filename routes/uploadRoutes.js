const express = require('express')
const router = express.Router()
const uploadController = require('../controller/upload')
const upload = require('../middleware/middleware')

router.post('/upload', upload.single('file'), uploadController.uploadFiles)

router.use('/upload', router)

module.exports = router