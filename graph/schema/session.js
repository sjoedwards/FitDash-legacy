const session = `
  type Session {
    name: String
    id: ID
    exercises: [SessionExercise]
    block: ID
  }
`;

export default session;