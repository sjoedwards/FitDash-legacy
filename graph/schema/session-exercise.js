const sessionExercise = `
  type SessionExercise implements Exercise {
    id: ID
    name: String
    reps: Int
    distance: Int
    sets: Int
    rest: Float
    tempo: String
    session: ID
  }
`;

export default sessionExercise;