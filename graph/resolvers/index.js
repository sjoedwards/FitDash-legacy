import Exercise from './exercise';
import Workout from './workout';

const resolvers = {
    ...Exercise,
    Query: {
        ...Workout
    }
};

export default resolvers;
