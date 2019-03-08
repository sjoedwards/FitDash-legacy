const workoutItem = `
  type WorkoutItem implements Item {
    id: ID
    exercise: Exercise
    reps: Int
    sets: Int
    workout: ID
  }
`;

export default workoutItem;