import { GrafbaseSchema, ModelFields } from "@grafbase/sdk";

const schema = new GrafbaseSchema();

const UserFields: ModelFields = {
  name: {
    type: schema.string().length({ min: 2, max: 20 }),
  },
  email: {
    type: schema.string().unique(),
  },
  avatarUrl: {
    type: schema.url(),
  },
  description: { type: schema.string().optional() },
  githubUrl: { type: schema.url().optional() },
  linkedinUrl: { type: schema.url().optional() },
  projects: {
    type: schema
      .relation(() => Project)
      .list()
      .optional(),
  },
};

const User = schema.defineModel("User", UserFields);

const ProjectFields: ModelFields = {
  title: { type: schema.string().length({ min: 3 }) },
  description: { type: schema.string() },
  image: { type: schema.url() },
  liveSiteUrl: { type: schema.url() },
  githubUrl: { type: schema.url() },
  category: { type: schema.string().search() },
  createdBy: { type: schema.relation(() => User) },
};

const Project = schema.defineModel("Project", ProjectFields);

export default schema;
