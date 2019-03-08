import rootQuery from '../schema/root-query';
import block from '../schema/block';
import cycle from '../schema/cycle';
import exercise from '../schema/exercise';
import item from '../schema/item';
import muscleGroup from '../schema/muscle-group';
import routineItem from '../schema/routine-item';
import routine from '../schema/routine';
import workoutItem from '../schema/workout-item'
import workout from '../schema/workout';

import resolvers from '../resolvers';
import {
  ApolloServer
} from 'apollo-server';
const typeDefs = [rootQuery, block, cycle, exercise, muscleGroup, routineItem, routine, workoutItem, workout, item];

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export default server;