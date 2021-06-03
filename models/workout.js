const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            type: {
                type: String,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;