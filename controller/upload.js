const fs = require('fs')
const User = require('../models/user')
const alert = require('alert')

const uploadFiles = (req, res) => {
  // console.log('id!!!!!!!!!!!!!!!!', req.session.passport.user.id)
  try {
    console.log(req.file)

    if (req.file === undefined) {
      return alert(`You must select a file.`)
    }

    User.update({
      type: req.file.mimetype,
      imageName: req.file.originalname,
      data: fs.readFileSync(
        __basedir + '/uploads/' + req.file.filename
      )
    }, {
      where: {
        id: req.session.passport.user.id
      }
    }
    ).then((image) => {
      fs.writeFileSync(
        __basedir + '/tmp/' + image.name,
        image.data
      )

      return alert(`File has been uploaded.`)
    })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying upload images: ${error}`)
  }
}

module.exports = {
  uploadFiles
}
