import Item from './item';
import Workout from './workout'

const resolvers = {
    ...Item,
    Query: {
        ...Workout
    }
};

export default resolvers;
