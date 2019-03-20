const workoutExercise = `
  type WorkoutExercise implements Exercise {
    id: ID
    name: String
    reps: Int
    sets: Int
    rest: Int
    tempo: String
    workout: ID
  }
`;

export default workoutExercise;