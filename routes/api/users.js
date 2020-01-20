const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
//It encrypts the user password
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//This checks the email password we can add diff conditions to it
const { check, validationResult } = require("express-validator/check");

//Taking USER SCHEMA
const User = require("../../models/User");
//@route   GET  api/users
//@desc    Register User
//@access  Public

//POST REQUEST TO CHECK WHETHER DATA ENTERED IS VALIDATE OR NOT
router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter  a password with 6 or more characrters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //400 IS BAD REQUEST IF THERE IS AN ERROR
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User Already Exits" }] });
      }

      //FOR GRAVATAR
      const avatar = gravatar.url(email, {
        s: "200",
        r: "13",
        d: "mm"
      });

      //CREATING INSTANCE OF VARIABLE
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //FOR HASHING PASSWORD USING BCRYPT

      const salt = await bcrypt.genSalt(10);

      //for hasing .hash(word to hash,salt) && for a promise we use salt
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      resizeBy.respone(500).send("Server error");
    }
  }
);

module.exports = router;
