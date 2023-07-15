const router = require("express").Router();
const apiRoutes = require("../controllers/response");

router
  .route("/11f0e3ec-0751-448a-bbe3-a33618760991")
  .post(apiRoutes.sendMessage);

module.exports = router;
