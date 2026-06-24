const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`GraphQL API server running at http://localhost:${PORT}/graphql`);
});
