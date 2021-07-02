const router = require("express").Router();
const homepageRoutes = require("./homepage-routes");
const profileRoutes = require("./profile-routes");

router.use("/homepage", homepageRoutes);

router.use("/profile", profileRoutes);

module.exports = router;
