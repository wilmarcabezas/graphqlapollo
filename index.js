const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/index');

const app =  express();



async function startExpressApolloServer() {


    const server = new ApolloServer({ schema });
    await server.start();

    const app = express();
    
    server.applyMiddleware({ app, path: '/api/graphql' });

    await new Promise(resolve => app.listen({ port: 3001 }, resolve));
    console.log(`Server ready at http://localhost:3001${server.graphqlPath}`);
    return { server, app };
}

startExpressApolloServer();