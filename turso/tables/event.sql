CREATE SCHEMA events;

CREATE TABLE IF NOT EXISTS events.event (
	id row id PRIMARY KEY,
   	start_ts DATETIME NOT NULL,
    end_ts DATETIME NOT NULL,
