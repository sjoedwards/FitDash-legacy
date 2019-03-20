import rootQuery from '../schema/root-query';
import block from '../schema/block';
import cycle from '../schema/cycle';
import exercise from '../schema/exercise';
import muscleGroup from '../schema/muscle-group';
import sessionExercise from '../schema/session-exercise';
import session from '../schema/session';
import workoutExercise from '../schema/workout-exercise';
import workout from '../schema/workout';

import resolvers from '../resolvers';
import {
    ApolloServer
} from 'apollo-server';
const typeDefs = [rootQuery, block, cycle, exercise, muscleGroup, sessionExercise, session, workoutExercise, workout];

const server = new ApolloServer({
    typeDefs,
    resolvers
});

export default server;