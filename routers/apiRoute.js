const router = require("express").Router();
 
const {Workout} = require("../models");

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

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(daWorkout => {
        res.status(201).send(daWorkout);
    })
    .catch(error => {
        res.status(400).json(error);
    })
});

router.put("/api/workouts/:id", async ({body, params}, res) => {
    // try{
        const daworkouts = await Workout.updateOne({_id: params.id},{ $push:{exercises: body}})
        res.status(200).send(daworkouts)
    // } catch(error) {
    //     res.status(500).send()
    // }
})

router.get("/api/workouts/range", async (req, res) => {
    const dbWorkout = await Workout.aggregate( [
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" } ,
            
          },  
           
            "dayOfWeek" : 7,
         
        } ])
    res.json(dbWorkout)
}) 


router.get("/api/workouts", async (req, res) => {
    // try{
        const daworkouts = await Workout.aggregate( [
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" } ,
                
              }
            } ])
      
        
      
        res.status(200).send(daworkouts)
    // } catch(error) {
    //     res.status(500).send()
    // }
});









module.exports = router;