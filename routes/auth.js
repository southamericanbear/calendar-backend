const { Router } = require("express");
const router = Router();
const {
  createUser,
  loginUser,
  revalidationToken,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { fieldValidate } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/validateJWT");

router.post(
  "/new",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password should be 6 character lenght").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password should be 6 character lenght").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidationToken);

module.exports = router;
