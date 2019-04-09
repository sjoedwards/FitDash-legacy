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
		WorkoutExercise(id: ID): WorkoutExercise,
		SessionExercise(id: ID): WorkoutExercise,
		Exercise(id: ID): Exercise,
		Exercises: [Exercises]
	}
`;
export default RootSchema;