import "reflect-metadata";
const express = require('express');
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
        resolvers: [HelloWorldResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();