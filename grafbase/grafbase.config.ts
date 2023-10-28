import { config, connector, g } from "@grafbase/sdk";

const mongodb = connector.MongoDB("MongoDB", {
  url: g.env("MONGO_ATLAS_URL"),
  apiKey: g.env("MONGO_API_KEY"),
  dataSource: g.env("MONGO_DATASOURCE"),
  database: g.env("MONGO_DATABASE"),
});

g.datasource(mongodb);

const address = g.type("Address", {
  street: g.string().mapped("street_name"),
});

mongodb
  .model("User", {
    name: g.string(),
    email: g.string().optional(),
    address: g.ref(address),
  })
  .collection("users");

export default config({
  schema: g,
});
