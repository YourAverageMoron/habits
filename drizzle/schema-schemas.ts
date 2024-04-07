import { relations, sql } from 'drizzle-orm';
import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const events = sqliteTable(
    'events',
    {
        id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
        start_time: integer('start_time', { mode: 'timestamp_ms' }).notNull(),
        end_time: integer('end_time', { mode: 'timestamp_ms' }).notNull(),
        intensity: integer('intesity').notNull(),
        notes: text('notes'),
        createdAt: integer('created_at').default(sql`(cast(unixepoch() as int))`),
        updatedAt: integer('updated_at').default(sql`(cast(unixepoch() as int))`),
    },
);

export const habitsRelations = relations(events, ({ many }) => ({
    tags: many(eventTags),
}))


export const eventTags = sqliteTable(
    'event_tags',
    {
        id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
        category: text('category').notNull(),
        value: text('value').notNull(),
        createdAt: integer('created_at').default(sql`(cast(unixepoch() as int))`),
        updatedAt: integer('updated_at').default(sql`(cast(unixepoch() as int))`),
    },
    (eventTags) => ({
        idx: uniqueIndex('idx').on(eventTags.id),
        categoryx: uniqueIndex('categoryx').on(eventTags.category),
    })
);


