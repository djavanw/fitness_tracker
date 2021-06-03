const express = require("express");
const router = new express.Router();
const Workouts = require("../models/workout.js");

router.get("/workouts", async (req, res) => {
    try{
        const daworkouts = await Workouts.find({})
        res.status(202).send(daworkouts)
    } catch(error) {
        res.status(500).send()
    }
});

router.post("/workouts", async (req, res) => {
    const daEntry = new Workouts(req.body)
    try{
        await Workouts.save()
        res.status(202).send(daEntry)
    } catch(error) {
        res.status(400).send()
    }
});






module.exports = router;