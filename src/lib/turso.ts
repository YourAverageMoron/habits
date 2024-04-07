import 'dotenv/config';
import axios from "axios";
import type { User } from "./types";

export async function createUserDatabase(user: User) {
    const databaseName = `habits-${user.username}`;

    console.log(`Creating - ${databaseName}`);
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.TURSO_API_TOKEN}`,
        },
    };

    const orgDatabase = await axios.post(
        `${process.env.TURSO_API_URL}/v1/organizations/${process.env.APP_ORGANIZATION}/databases`,
        {
            name: `${databaseName}`,
            group: `${process.env.APP_GROUP}`,
            location: `${process.env.APP_PRIMARY_LOCATION}`,
            schema: "habits-schema"
        },
        config
    );
    const {
        database: { Hostname: dbUrl },
    } = orgDatabase.data;

    console.log(`Db - ${dbUrl}`);
    const orgToken = await axios.post(
        `https://${process.env.TURSO_API_URL}/v1/organizations/${process.env.APP_ORGANIZATION}/databases/${databaseName}/auth/tokens`,
        {},
        config
    );
    const { jwt: authToken } = orgToken.data;

    return {
        ok: true,
        message: "Organization database created",
        data: {
            url: dbUrl,
            authToken,
        },
    };
}


