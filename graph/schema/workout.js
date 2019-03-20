const workout = `
  type Workout {
    id: ID
    name: String
    session: ID
    exercises: [WorkoutExercise]
    date: String
  }
`;

export default workout;
