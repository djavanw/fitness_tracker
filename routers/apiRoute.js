const router = require("express").Router();
 
const { Workout } = require("../models");

// router.post("/api/workouts", async (req, res) => {
//     try{
//         const newExer = await Workout.create({
//             ...req.body,
//         });
//         res.status(202).json(newExer);
//     } catch(error) {
//         res.status(400).json(error);
//     }
// })

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


router.post("/api/workouts", async ({ body }, res) => {
    try{
        const daWorkout2 = await Workout.create(body);
        res.status(201).json(daWorkout2);

    } catch(error) {
        res.status(400).json(error);
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


router.put("/api/workouts/:id", async ({body, params}, res) => {
    try{
        const daworkouts = await Workout.findByIdAndUpdate({_id: params.id},{ $push:{exercises: body}},
            { new: true, runValidators: true }
            )
        //const daworkouts = await Workout.updateOne({_id: params.id},{ $push:{exercises: body}})
        res.status(200).json(daworkouts)
    } catch(error) {
    res.status(500).json("There is an error in the put route.")
    }
});



router.get("/api/workouts/range", async (req, res) => {
    try{
        const daRange = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" } ,
                }  
            },
            {
                $sort: {day: -1} 
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

/*******************DELETE************************************** */
router.put("/api/workouts/:id", async ({body, params}, res) => {
    try{
        const daworkouts = await Workout.findByIdAndDelete({_id: params.id},{ $push:{exercises: body}},
            { new: true, runValidators: true }
            )
        //const daworkouts = await Workout.updateOne({_id: params.id},{ $push:{exercises: body}})
        res.status(200).json(daworkouts)
    } catch(error) {
    res.status(500).json("There is an error in the delete route.")
    }
});

/*******************DELETE************************************* */















module.exports = router;