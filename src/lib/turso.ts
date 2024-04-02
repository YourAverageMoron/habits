import axios from "axios";
import type { User } from "./types";
import { createClient } from "@libsql/client/http";


export async function createOrganizationDatabase(user: User) {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.TURSO_API_TOKEN}`,
    },
  };

  // create a database for organization
  const orgDatabase = await axios.post(
    `${process.env.TURSO_API_URL}/v1/databases`,
    {
      name: `${process.env.APP_NAME}-${user.username}`,
      group: `${process.env.APP_GROUP}`,
      location: `${process.env.APP_PRIMARY_LOCATION}`,
      schema: `${process.env.APP_NAME}`
    },
    config
  );
  const {
    database: { Hostname: dbUrl },
  } = orgDatabase.data;

  // create an authentication token
  const orgToken = await axios.post(
    `${process.env.TURSO_API_URL}/v1/organizations/${process.env.APP_ORGANIZATION}/databases/${process.env.APP_NAME}-${user.username}/auth/tokens`,
    {},
    config
  );
  const { jwt: authToken } = orgToken.data;

  // run migrations
  const db = createClient({
    url: `libsql://${dbUrl}`,
    authToken,
  });

  return {
    ok: true,
    message: "Organization database created",
    data: {
      url: dbUrl,
      authToken,
    },
  };
}
