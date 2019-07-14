const express = require("express");
const bodyParser = require("body-parser");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        # input type is used to club params together
        # see createEvent params
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        //since the function takes the eventInput variable as parameter
        const { title, description, price, date } = args.eventInput;
        const event = {
          _id: Math.random().toString(),
          title,
          description,
          price,
          date
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.use("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(3000);
