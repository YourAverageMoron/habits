import { sql } from 'drizzle-orm';
import {
    index,
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
    'users',
    {
        id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
        name: text('name').notNull(),
        username: text('username').notNull(),
        email: text('email').notNull(),
        password: text('password').notNull(),
        dbUrl: text('db_url'),
        createdAt: integer('created_at').default(sql`(cast(unixepoch() as int))`),
        updatedAt: integer('updated_at').default(sql`(cast(unixepoch() as int))`),
    },
    (users) => ({
        emailIdx: uniqueIndex('email_idx').on(users.email),
        usernameIdx: uniqueIndex('username_idx').on(users.username),
        nameIdx: index('name_idx').on(users.name),
    }),
);
