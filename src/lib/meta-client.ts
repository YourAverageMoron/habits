// app/lib/client.ts

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/http';
import * as schema from '../../drizzle/meta-schemas';

interface Env {
    TURSO_META_DB_AUTH_TOKEN?: string;
    TURSO_META_DB_URL?: string;
}

export function buildDbClient() {
    const url = (process.env as unknown as Env).TURSO_META_DB_AUTH_TOKEN?.trim();
    if (url === undefined) {
        throw new Error('TURSO_DB_URL is not defined');
    }

    const authToken = (process.env as unknown as Env).TURSO_META_DB_AUTH_TOKEN?.trim();
    if (authToken === undefined) {
        if (!url.includes('file:')) {
            throw new Error('TURSO_DB_AUTH_TOKEN is not defined');
        }
    }

    return drizzle(createClient({ url, authToken }), { schema });
}
