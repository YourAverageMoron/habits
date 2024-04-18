CREATE TABLE events (
	id serial primary key,
	start_time integer NOT NULL,
	end_time integer NOT NULL,
	intesity integer NOT NULL,
	notes text,
	created_at timestamp DEFAULT now(),
	updated_at timestamp DEFAULT now()
);

 CREATE TABLE event_tag_categories (
	id serial primary key,
	name text NOT NULL,
	created_at timestamp DEFAULT now(),
	updated_at timestamp DEFAULT now()
);

 CREATE TABLE event_tags (
	id serial primary key,
	event_id integer NOT NULL  REFERENCES events (id),
	category_id integer NOT NULL  REFERENCES event_tag_categories (id),
	value text NOT NULL,
	created_at timestamp DEFAULT now(),
	updated_at timestamp DEFAULT now()
);

CREATE UNIQUE INDEX  ON event_tags (id);
CREATE UNIQUE INDEX  ON event_tags (category_id);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tag_categories ENABLE ROW LEVEL SECURITY;

