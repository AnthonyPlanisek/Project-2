const router = require('express').Router()

router.get('/', async (req, res) => {
//   const dishData = await Dish.findAll().catch((err) => {
//     res.json(err)
//   })
//   const dishes = dishData.map((dish) => dish.get({ plain: true }))
  res.render('homepage')
})

router.get('/logout', async (req, res) => {
  res.render('logout')
})

module.exports = router
