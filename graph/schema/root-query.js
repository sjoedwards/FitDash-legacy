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

type Exercise {
	id: ID,
	Name: String,
	MuscleGroups: [MuscleGroups]
}

type MuscleGroups {
	id: ID,
	name: String
}

interface Item {
	id: ID
	exercise: Exercise
	reps: Int
	sets: Int
}

type WorkoutItem implements Item {
	id: ID
	exercise: Exercise
	reps: Int
	sets: Int
	workout: ID
}

type RoutineItem implements Item {
	id: ID
	exercise: Exercise
	reps: Int
	sets: Int
	routine: ID
}

type Routine {
	name: String
	id: ID
	items: [RoutineItem]
}

type Block {
	name: String
	id: ID
	routines: [Routine]
}

type Cycle {
	name: String
	id: ID
	blocks: [Block]
}`;

export default RootSchema;