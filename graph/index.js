const { ApolloServer, gql } = require('apollo-server');

const data = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`

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

type Workout {
	id: ID
	Routine: Routine
	Block: Int
	Cycle: Int
	Items: [WorkoutItem]
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
}
`;

const resolvers = {
    Item: {
        __resolveType(item) {
            if (item.routine) {
                return 'RoutineItem';
            }
            if (item.workout) {
                return 'WorkoutItem';
            }
        }
    },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});