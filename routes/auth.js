const router = require("express").Router();
const User = require("../model/User");

/// Validation
router.get("/", (req, res) => {
  res.send("Hello From The Server")
})
const Joi = require("@hapi/joi");

const validationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {

  // Validation of data before saving a user into the database
  const validation = validationSchema.validate(req.body);
  if (validation.error) return res.status(400).send(validation.error.details[0].message)
  // Checking if the user already exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send("Email Already Exists")

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400);
  }

});

router.post("/login", (req, res) => {
  res.send("Register");
});

module.exports = router;

