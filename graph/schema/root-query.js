const RootSchema = `
	type Query {
		Workout(id: ID): Workout,
		Workouts(routine: ID, block: ID, cycle: ID): [Workout],
		Cycle(id: ID): Cycle,
		Cycles: [Cycle],
		Block(id: ID): Block
		Blocks(cycle: ID): [Block],
		Routine(id: ID): Routine,
		Routines(cycle: ID, block: ID): [Routine],
		WorkoutItem(id: ID): Item,
		RoutineItem(id: ID): Item
	}
`
export default RootSchema;