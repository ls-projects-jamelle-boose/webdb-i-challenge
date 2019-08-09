const express = require("express");

//database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    console.log(accounts);
    res.status(200).json({
      success: true,
      accounts
    });
  } catch (error) {
    res.status(500).json({
      message: `Error getting budget.`,
      error
    });
  }
});

module.exports = router;
