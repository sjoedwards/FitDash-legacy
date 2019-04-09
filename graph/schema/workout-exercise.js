const workoutExercise = `
  type WorkoutExercise implements Exercise {
    id: ID
    name: String
    reps: Int
    sets: Int
    rest: Int
    tempo: String
    workout: ID
    weight: Int
  }
`;

export default workoutExercise;