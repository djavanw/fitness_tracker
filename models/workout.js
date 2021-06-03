const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    kind_of: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    }

});



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;