const express = require("express");
const router = express.Router();

const courseController = require("../../controllers/api/v1/course.controller");

router.get("/courses", courseController.index);
router.get("/courses/:id", courseController.show);
router.post("/courses", courseController.store);
router.patch("/courses/:id", courseController.update);
router.delete("/courses/:id", courseController.destroy);

module.exports = router;
