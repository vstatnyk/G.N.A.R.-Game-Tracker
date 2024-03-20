const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the player schema as a subdocument
const playerSchema = new Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  points: { type: Number, default: 0 },
});

// Define the game schema
const gameSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date, default: null },
  players: [playerSchema],
});

// Create the Game model
const Game = mongoose.model("Game", gameSchema);
