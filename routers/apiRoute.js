const express = require("express");
const router = new express.Router();
const Workout = require("../models/workout.js");

// router.post("/api/workouts", (req, res) => {
//     Workout.create ({})
//     .then(
//         daWorkout => {
//             res.json(daWorkout);
//         }
//     )
//     .catch(error => {
//         res.json(error);
//     });
// });

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(daWorkout => {
        res.status(202).send(daWorkout);
    })
    .catch(error => {
        res.status(400).json(error);
    })
});



router.get("/api/workouts", async (req, res) => {
    try{
        const daworkouts = await Workout.find({})
        res.status(202).send(daworkouts)
    } catch(error) {
        res.status(500).send()
    }
});









module.exports = router;