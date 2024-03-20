const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const AccountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: "user" },
  games: { type: Array, default: [] },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
