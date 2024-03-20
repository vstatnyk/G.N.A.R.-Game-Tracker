const express = require("express");
const router = express.Router();
const argon2 = require("argon2");

router.post("/signIn", async (req, res) => {
  //seeing if account exists
  const login = await Account.findOne({ email: req.body.email });

  if (!login) {
    console.log("email does not exist");
    res.json({ error: "Email does not exist" });
  } else {
    try {
      if (await argon2.verify(login.password, req.body.password)) {
        res.json(login);
      } else {
        res.json({ error: "Password is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  return true;
});

module.exports = router;
