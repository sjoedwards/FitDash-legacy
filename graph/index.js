import ApolloServer from './apollo-server';

ApolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});