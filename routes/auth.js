const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const verify = require("./verifyToken")

/// Validation
router.get("/home",verify,(req, res) => {
  res.send("Hello From The Server !! 👨‍")
})

/// Registration Validation Schema
const registrationValidationSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {

  // Validation of data before saving a user into the database
  const validation = registrationValidationSchema.validate(req.body);
  if (validation.error) return res.status(400).send(validation.error.details[0].message)
  // Checking if the user already exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send("Email Already Exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400);
  }

});

/// Login Validation Schema
const loginValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {

  // Validation of data before saving a user into the database
  const validation = loginValidationSchema.validate(req.body);
  if (validation.error) return res.status(400).send(validation.error.details[0].message)
  // Checking if the email already exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Email or Password is wrong !! 🤔");
  // If password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email or Password is wrong !! 🤔");
 
  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header("auth-token",token).send(token)
 
  // res.send("Login Successfully !! 😊")
});

module.exports = router;

