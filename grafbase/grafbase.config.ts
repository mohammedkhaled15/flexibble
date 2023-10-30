import { config, connector, g } from "@grafbase/sdk";

const mongo = connector.MongoDB("MongoDB", {
  apiKey: g.env("MONGODB_API_KEY"),
  url: g.env("MONGODB_API_URL"),
  dataSource: g.env("MONGODB_DATASOURCE"),
  database: g.env("MONGODB_DATABASE"),
});

//@ts-ignore
const User = mongo
  .model("User", {
    name: g.string().length({ min: 2, max: 100 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ min: 2, max: 1000 }).optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    // projects: g
    //   .relation(() => Project)
    //   .list()
    //   .optional(),
  })
  .collection("users");

//@ts-ignore
const Project = mongo
  .model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    // category: g.string().search(),
    // createdBy: g.relation(() => User),
  })
  .collection("projects");

g.datasource(mongo);

export default config({
  schema: g,
});
