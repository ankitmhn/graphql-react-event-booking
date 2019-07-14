const express = require("express");
const bodyParser = require("body-parser");
const graphQlHttp = require("express-graphql");
const {buildSchema} = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use("/", (req, res, next) => {
    res.send("Hello World!");
});

app.use("/graphql", graphQlHttp({
    schema: null,
    rootValue: {}
}));

app.listen(3000);
