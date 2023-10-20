const router = require("express").Router();
const apiRoutes = require("../controllers/response");

router
  .route(process.env.HOOK ? `/${process.env.HOOK}` : "/")
  .post(apiRoutes.sendMessage);

module.exports = router;
