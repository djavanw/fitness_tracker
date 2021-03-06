const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },

// needed to allow more than 7 exercise names 
  async getWorkoutsGraphic() {
    const res = await fetch(`/api/workouts/graphic`);
    const json = await res.json();

    return json;
  },


// added because there was no delete api
  async deleteWorkout(data) {
    const sid = location.search.split("=")[1];

    const del = await fetch("/api/workouts/" + sid, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await del.json();

    return json;
  },

};