
CREATE TABLE events (
        id serial primary key,
        user_id uuid default auth.uid(),
        start_time timestamp NOT NULL,
        end_time timestamp NOT NULL,
        intesity integer NOT NULL,
        notes text,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_access_events ON events
    FOR ALL
    USING ((select auth.uid()) = user_id);

CREATE UNIQUE INDEX ON events(id);

---

 CREATE TABLE event_tag_categories (
        id serial primary key,
        user_id uuid default auth.uid(),
        name text NOT NULL,
        category_index integer,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
);

ALTER TABLE event_tag_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_access_event_tag_categories ON event_tag_categories
    FOR ALL
    USING ((select auth.uid()) = user_id);

CREATE UNIQUE INDEX ON event_tag_categories(id);
CREATE INDEX ON event_tag_categories(category_index);

ALTER TABLE event_tag_categories
  ADD CONSTRAINT event_tag_categories_user_and_name_unique UNIQUE(user_id, name);
ALTER TABLE event_tag_categories
  ADD CONSTRAINT event_tag_categories_name_lowercase
  CHECK (name = lower(name));

---

 CREATE TABLE event_tags (
        id serial primary key,
        user_id uuid default auth.uid(),
        event_id integer NOT NULL  REFERENCES events (id),
        category_id integer NOT NULL  REFERENCES event_tag_categories (id),
        value text NOT NULL,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
);

ALTER TABLE event_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_access_event_tags ON event_tags
    FOR ALL
    USING ((select auth.uid()) = user_id);

CREATE UNIQUE INDEX ON event_tags(id);
CREATE INDEX ON event_tags(category_id);
