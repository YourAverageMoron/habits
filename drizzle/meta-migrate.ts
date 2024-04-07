import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const metaDbClient = createClient({
    url: process.env.TURSO_META_DB_URL as string,
    authToken: process.env.TURSO_META_DB_AUTH_TOKEN as string,
});

export const db = drizzle(metaDbClient);

async function main() {
    try {
        await migrate(db, {
          migrationsFolder: 'drizzle/meta-migrations',
        });
        console.log('Tables migrated!');
        process.exit(0);
    } catch (error) {
        console.error('Error performing migration: ', error);
        process.exit(1);
    }
}

main();
