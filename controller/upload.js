const fs = require('fs')
const db = require('../models')
const image = db.images

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file)

    if (req.file === undefined) {
      return res.send(`You must select a file.`)
    }

    image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        '../uploads/' + req.file.filename
      )
    }).then((image) => {
      fs.writeFileSync(
        '../tmp/' + image.name,
        image.data
      )

      return res.send(`File has been uploaded.`)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying upload images: ${error}`)
  }
}

module.exports = {
  uploadFiles
}
