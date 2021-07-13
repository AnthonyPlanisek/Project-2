require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const passport = require('passport')
const moment = require('moment')
const helmet = require('helmet')
const PORT = process.env.PORT || 3333
const app = express()
const db = require('./models')
const uploadRoutes = require('./routes/uploadRoutes')
const initRoutes = require('./routes/web')
const game = require('./routes/htmlRoutes')
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)

global.__basedir = __dirname
initRoutes(app)

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

if (app.get('env') !== 'test') {
  app.use(morgan('dev')) // Hook up the HTTP logger
}

app.use(express.static(path.join(__dirname, 'public')))
require('./config/passport')(db, app, passport) // pass passport for configuration

// Define our routes
app.use('/api', require('./routes/apiRoutes')(passport, db))
app.use(require('./routes/htmlRoutes')(db))
app.use(require('./routes/uploadRoutes')(db))

// Secure express app
app.use(helmet.hsts({
  maxAge: moment.duration(1, 'years').asMilliseconds()
}))

// catch 404 and forward to error handler
if (app.get('env') !== 'development') {
  app.use((req, res, next) => {
    const err = new Error('Not Found: ' + req.url)
    err.status = 404
    next(err)
  })
}

const syncOptions = {
  force: process.env.FORCE_SYNC === 'true'
}

if (app.get('env') === 'test') {
  syncOptions.force = true
}

db.sequelize.sync(syncOptions).then(() => {
  if (app.get('env') !== 'test' && syncOptions.force) {
    require('./db/seed')(db)
  }

  // socket.io chat
  const users = {}
  const typers = {}

  io.on('connection', socket => {
    console.log('connected...')

    socket.on('user connected', payload => {
      console.log('new user is joined', payload)
      if (!payload) { return }
      // socket.join('room_' + payload.name)
      users[socket.id] = {
        id: socket.id,
        name: payload.name,
        avatar: payload.avatar
      }

      socket.broadcast.emit('user connected', users[socket.id])
      // socket.broadcast.emit('user connected', payload)
    })

    // socket.on('user typing', () => {
    //   typers[socket.id] = 1

    //   socket.broadcast.emit('user typing', {
    //     user: users[socket.id].name,
    //     typers: Object.keys(typers).length
    //   })
    // })

    socket.on('user stopped typing', () => {
      delete typers[socket.id]

      socket.broadcast.emit('user stopped typing', Object.keys(typers).length)
    })

    socket.on('send message', payload => {
      delete typers[socket.id]

      socket.broadcast.emit('send message', {
        user: payload.user,
        message: payload.message,
        typers: Object.keys(typers).length
      })
    })
  })

  server.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
  })
})

app.use('/upload', uploadRoutes)
app.use('/game', game)

module.exports = app
