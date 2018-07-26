var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// SHOW
router.get("/", function (req, res) {
    burger.selectAll(function(data) {
        res.render("index", { burgers: data });
    });
});

// CREATE
router.post("/api/burgers", (req, res) => {
    burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
        res.json({ id: result.insertId });
    })
})

// UPDATE
router.put("/api/burgers/:id", (req, res) => {
    var cond = "id = " + req.params.id;

    burger.updateOne({ devoured: req.body.devoured }, cond, function(result) {
        if (result.changedRows == 0) return res.status(404).end();
        else res.status(200).end();
    });
});


module.exports = router;