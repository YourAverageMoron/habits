
CREATE TABLE events (
        id serial primary key,
        user_id uuid default auth.uid(),
        start_time timestamptz NOT NULL,
        end_time timestamptz NOT NULL,
        intensity integer NOT NULL,
        journal text,
        created_at timestamptz DEFAULT (now() at time zone 'utc'),
        updated_at timestamptz DEFAULT (now() at time zone 'utc'),
        timezone text NOT NULL
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_access_events ON events
    FOR ALL
    USING ((select auth.uid()) = user_id);
CREATE UNIQUE INDEX ON events(id);
ALTER TABLE events ADD CONSTRAINT events_check_timezone CHECK (timezone( timezone, '2000-01-01'::timestamp) is not null);

---

 CREATE TABLE event_tag_categories (
        id serial primary key,
        user_id uuid default auth.uid(),
        name text NOT NULL,
        category_index integer,
        created_at timestamptz DEFAULT (now() at time zone 'utc'),
        updated_at timestamptz DEFAULT (now() at time zone 'utc') 
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
        event_id integer NOT NULL  REFERENCES events (id) on delete cascade,
        category_id integer NOT NULL  REFERENCES event_tag_categories (id) on delete cascade,
        value text NOT NULL,
        created_at timestamptz DEFAULT (now() at time zone 'utc'),
        updated_at timestamptz DEFAULT (now() at time zone 'utc') 
);

ALTER TABLE event_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_access_event_tags ON event_tags
    FOR ALL
    USING ((select auth.uid()) = user_id);

CREATE UNIQUE INDEX ON event_tags(id);
CREATE INDEX ON event_tags(category_id);



---


create or replace function total_time_over_days(n interval)
returns TABLE (start_date date, count numeric, sum text)
language sql
as $$
  select
        date(start_time at time zone timezone) as start_date,
        count(*),
        (sum(end_time - start_time))::TEXT from events
  WHERE start_time at time zone timezone > current_date - total_time_over_days.n
  group by start_date
  order by start_date asc;
$$;


create or replace function get_tag_values(categories numeric[])
returns TABLE (category_id numeric, value text)
language sql
as $$
select category_id, value from event_tags 
where category_id = ANY(get_tag_values.categories)
group by category_id, value;
$$;


create or replace function hour_of_day(n interval)
returns TABLE (hour numeric, count numeric, average text)
language sql
as $$
select 
date_part('hour', start_time at time zone timezone) as hour,
count(*) as count,
avg(end_time - start_time):: TEXT as average
 from events 
 where start_time at time zone timezone > current_date - hour_of_day.n
 group by hour 
 order by hour asc;
$$;


create or replace function category_averages(n interval, categories numeric[])
returns TABLE (category_value text, category_id numeric, count numeric, average_time text, average_intensity numeric)
language sql
as $$
select 
value,
category_id,
count(*) as count,
avg(end_time - start_time):: TEXT as average_time,
round(avg(intensity), 2) as average_intensity
from event_tags as et
left join events as e on e.id = et.event_id
where start_time at time zone timezone > current_date - category_averages.n
AND category_id in (select unnest(category_averages.categories))
GROUP BY value, category_id;
$$;
