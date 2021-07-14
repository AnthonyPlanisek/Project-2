module.exports = (db) => {
  db.User.create({
    userName: 'Adam',
    email: 'adam@gates.com',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  }).then(() => {
    db.User.create({
      userName: 'Uma',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD,
      isAdmin: false
    }).then(() => {
      db.Example.create({
        text: 'Sample item',
        description: 'Adam can\'t see this',
        UserId: 2
      })
    }).then(() => {
      db.Location.create({
        id: 1,
        lat: 40.7580,
        lng: -73.9855,
        city: 'New York'
      }).then(() => {
        db.Location.create({
          id: 2,
          lat: 34.0430,
          lng: -118.2673,
          city: 'Los Angeles'
        })
      }).then(() => {
        db.Location.create({
          id: 3,
          lat: 41.8827,
          lng: -87.6233,
          city: 'Chicago'
        })
      })
    })
  })
}
