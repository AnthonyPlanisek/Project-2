const routes = require('./routes')
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3001
const { auth } = require('express-openid-connect')
const sequelize = require('./config/config')
const router = require('./routes/index')
const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.DB_SECRET,
  baseURL: 'http://localhost:3001',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

app.use(routes)

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? res.redirect('/api/profile') : res.redirect('/login'))
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})