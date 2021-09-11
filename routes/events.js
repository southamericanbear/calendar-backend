const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldValidate } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/validateJWT");

router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/new",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "Finish date is required").custom(isDate),
  ],
  fieldValidate,
  createEvent
);

router.put(
  "/update/:id",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "Finish date is required").custom(isDate),
  ],
  fieldValidate,
  updateEvent
);

router.delete("/delete/:id", deleteEvent);

module.exports = router;
