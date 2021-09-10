const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { fieldValidate } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/validateJWT");

router.use(validateJWT);

router.get(
  "/",
  [check("event", "Event is required").not().isEmpty()],
  fieldValidate,
  getEvents
);

router.post(
  "/new",
  [
    check("event", "Event is required").not().isEmpty(),
    check("event", "Event should be at least 25 character lenght").isLength({
      min: 25,
    }),
  ],
  fieldValidate,
  createEvent
);

router.put(
  "/update/:id",
  [
    check("event", "Event is required").not().isEmpty(),
    check("event", "Event should be at least 25 character lenght").isLength({
      min: 25,
    }),
  ],
  fieldValidate,
  updateEvent
);

router.delete("/delete/:id", deleteEvent);

module.exports = router;
