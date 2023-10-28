import { g, config, connector, auth } from "@grafbase/sdk";

const contentful = connector.GraphQL("Contentful", {
  url: g.env("NEXT_PUBLIC_GRAFBASE_API_URL"),
  headers: (headers) => {
    headers.set(
      "Authorization",
      `Bearer ${g.env("NEXT_PUBLIC_GRAFBASE_API_KEY")}`
    );
  },
});

g.datasource(contentful);
