CREATE TABLE events (
	id serial primary key,
	start_time integer NOT NULL,
	end_time integer NOT NULL,
	intesity integer NOT NULL,
	notes text,
	created_at timestamp DEFAULT now(),
	updated_at timestamp DEFAULT now()
);

 CREATE TABLE event_tags (
	id serial primary key,
	event_id integer REFERENCES events (id),
	category text NOT NULL,
	value text NOT NULL,
	created_at timestamp DEFAULT now(),
	updated_at timestamp DEFAULT now()
);

CREATE UNIQUE INDEX  ON event_tags (id);
CREATE UNIQUE INDEX  ON event_tags (category);
