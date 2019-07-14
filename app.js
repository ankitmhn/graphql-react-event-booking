const express = require("express");
const bodyParser = require("body-parser");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ["cooking", "sports", "music"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.use("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(3000);
