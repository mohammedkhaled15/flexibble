import { config, connector, g } from "@grafbase/sdk";
//@ts-ignore
const mongo = connector.MongoDB("MongoDB", {
  apiKey: g.env("MONGODB_API_KEY"),
  url: g.env("MONGODB_API_URL"),
  dataSource: g.env("MONGODB_DATASOURCE"),
  database: g.env("MONGODB_DATABASE"),
});



// const address = g
//   .type("Address", {
//     street: g.string(),
//     city: g.string(),
//     country: g.string(),
//   })
//   .collection("addresses");
// mongo
//   .model("Address", {
//     street: g.string(),
//     city: g.string(),
//     country: g.string(),
//   })
//   .collection("addresses");

mongo
  .model("User", {
    name: g.string(),
    email: g.string(),
    age: g.int().optional(),
    // address: g.ref(address).optional(),
    metadata: g.json().optional(),
  })
  .collection("users");

g.datasource(mongo);

export default config({
  schema: g,
});

