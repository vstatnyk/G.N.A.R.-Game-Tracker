require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
const AccountRoutes = require("./routes/Account");
const GameRoutes = require("./routes/Game");

//schemas
const Account = require("./models/AccountSchema");
const Game = require("./models/GameSchema");

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/account", AccountRoutes);
app.use("/api/game", GameRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Connect to the MongoDB database
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("database is working"))
  .catch(console.error);
