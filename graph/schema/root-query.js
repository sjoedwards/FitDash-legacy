const RootSchema = `
	type Query {
		Workout(id: ID): Workout,
		Workouts: [Workout],
		Cycle(id: ID): Cycle,
		Cycles: [Cycle],
		Block(id: ID): Block
		Blocks: [Block],
		Session(id: ID): Session,
		Sessions: [Session],
		WorkoutExercise(id: ID): Exercise,
		SessionExercise(id: ID): Exercise
	}
`;
export default RootSchema;