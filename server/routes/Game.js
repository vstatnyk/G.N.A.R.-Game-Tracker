const express = require("express");
const router = express.Router();

router.post("/create", async (req, res) => {
  //seeing if Game exists
  const game = await Game.findById(req.body._id);

  if (game) {
    res.json({ error: "game already exists" });
  } else {
    try {
      const newGame = new Game({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        players: req.body.players,
      });

      await newGame.save();
      res.json(newGame);
    } catch (error) {
      // handle the error, maybe send a response with error details
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.post("/delete", async (req, res) => {
  try {
    const Game = await Game.findByIdAndDelete(req.body._id);
    res.json(Game);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  //seeing if account exists
  try {
    const playerData = req.body.players.map((accountId) => ({
      accountId,
      points: ,
    }));

    const game = await Game.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      players: playerData,
    });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//only update points
app.post('/:gameId/:playerId/score', async (req, res) => {
  const { gameId, playerId } = req.params;
  const { pointsToAdd } = req.body; // Assuming you pass the points to add in the request body

  try {
      const game = await Game.findOneAndUpdate(
          { 
              _id: gameId, 
              "players.accountId": playerId 
          },
          { 
              $inc: { "players.$.points": pointsToAdd } // Increment points for the specific player
          },
          { new: true } // Return the updated document
      );

      if (!game) {
          return res.status(404).send('Game or player not found');
      }

      res.status(200).json(game);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

module.exports = router;