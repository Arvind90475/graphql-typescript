import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import userResolver from "./resolver/user";
import dbConfig from "./ormconfig";

const main = async () => {
  await createConnection(dbConfig);
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(4000, () => console.log("server has started on port 4000"));
};

main();
