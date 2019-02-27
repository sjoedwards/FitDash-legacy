import ApolloServer from './apollo-server';

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

ApolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});