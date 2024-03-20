const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const Account = require("../models/AccountSchema");

router.get("/get", async (req, res) => {
  try {
    const Accounts = await Account.find();
    res.json(Accounts);
  } catch (error) {
    // handle the error, maybe send a response with error details
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  //seeing if email exists
  const email = await Account.findOne({ email: req.body.email });

  if (email) {
    res.json({ error: "Email already exists" });
  } else {
    try {
      //creating password hash
      try {
        var passwordHash = await argon2.hash(req.body.password);
      } catch (err) {
        console.log("Some Error Happened: " + err);
      }

      const newAccount = new Account({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
      });

      await newAccount.save();
      res.json(newAccount);
    } catch (error) {
      // handle the error, maybe send a response with error details
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.get("/delete", async (req, res) => {
  //seeing if account exists
  try {
    const account = await Account.findOneAndDelete({ email: req.body.email });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  //seeing if account exists
  try {
    const account = await Account.findByIdAndUpdate(req.body._id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      games: req.body.games,
    });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
