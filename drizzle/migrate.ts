import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

console.log(`url - ${process.env.TURSO_DB_URL}`)

export const dbClient = createClient({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
});

export const schemaDbClient = createClient({
    url: process.env.TURSO_SCHEMA_DB_CLIENT as string,
    authToken: process.env.TURSO_SCHEMA_DB_AUTH_TOKEN as string,
});

export const db = drizzle(dbClient);
export const schemaDb = drizzle(schemaDbClient);

async function main() {
  try {
    // await migrate(db, {
    //   migrationsFolder: 'drizzle/migrations',
    // });
    await migrate(schemaDb, {
        migrationsFolder: 'drizzle/migrations-users',
    });
    console.log('Tables migrated!');
    process.exit(0);
  } catch (error) {
    console.error('Error performing migration: ', error);
    process.exit(1);
  }
}

main();
