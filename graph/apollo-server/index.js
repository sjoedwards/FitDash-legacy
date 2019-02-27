import rootQuery from '../schema/root-query';
import workout from '../schema/workout';

import resolvers from '../resolvers';
import { ApolloServer } from 'apollo-server';

const typeDefs = [rootQuery, workout];

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
