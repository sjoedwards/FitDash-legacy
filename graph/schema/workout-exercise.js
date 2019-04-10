const workoutExercise = `
  type WorkoutExercise implements Exercise {
    id: ID
    name: String
    reps: Int
    distance: Int
    sets: Int
    rest: Float
    tempo: String
    workout: ID
    weight: Int
  }
`;

export default workoutExercise;