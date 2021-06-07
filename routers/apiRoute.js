const router = require("express").Router();
const { Workout } = require("../models");

router.post("/api/workouts", async ({ body }, res) => {
    try{
        const daWorkout2 = await Workout.create(body);
        res.status(201).json(daWorkout2);

    } catch(error) {
        res.status(400).json(error);
    }
});

router.put("/api/workouts/:id", async ({body, params}, res) => {
    try{
        const daworkouts = await Workout.findByIdAndUpdate({_id: params.id},{ $push:{exercises: body}},
            { new: true, runValidators: true }
            )
        //const daworkouts = await Workout.updateOne({_id: params.id},{ $push:{exercises: body}})
        res.status(200).json(daworkouts)
    } catch(error) {
        console.log(error)
    res.status(500).json("There is an error in the put route.")
    }
});


router.get("/api/workouts", async (req, res) => {
    try{
        const daworkouts = await Workout.aggregate( [
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" } ,
              }
            }
        ])
            res.status(200).json(daworkouts)
    } catch(error) {
         res.status(500).json()
        }
});

// last 7 completed workouts sorted to see most recent
router.get("/api/workouts/range", async (req, res) => {
    try{
        const daRange = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" } ,
                }  
            },
            {
                $sort: {_id: -1} 
            },
            {
                $limit: 7
            }
        ])
            res.status(201).json(daRange)
    } catch(error) {
        res.status(400).json(error);
        }
});


router.get("/api/workouts/graphic", async (req, res) => {
    try{
        const daCircle = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" } ,
                }  
            }
        ])
            res.status(201).json(daCircle)
    } catch(error) {
        res.status(400).json(error);
        }
});


/*******************DELETE************************************** */
router.delete("/api/workouts/:id", async ({body, params}, res) => {
    try{
        const daworkouts = await Workout.findByIdAndDelete({_id: params.id},
            { $pull:{workouts: body}})
        //const daworkouts = await Workout.updateOne({_id: params.id},{ $push:{exercises: body}})
        console.log(daworkouts)
        res.status(200).json(daworkouts)
    } catch(error) {
    res.status(400).json("Delete not working")
    }
});

/*******************DELETE************************************* */


module.exports = router;