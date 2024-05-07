## TODO
- [x] Login page
- [x] Event creation page
- [ ] Dashboard page
- [x] Deployment
- [ ] Properly setup database migrations
- [x] Better validation on each page
- [ ] on submit check if there are any events that exist at the same time as the one being input
- [x] fix mobile styling on main page
- [x] fix utc time errors
- [ ] add a list of entries with the ability to modify or delete them
- [ ] fix the server side rendering issues


## Ideas
- [ ] LLM to produce motivational notes?


## Interesting points

### Timestamps

#### Problem
One requirement was to represent event times as the "time of day" rather than the absolute time e.g a timestamp.
This poses problems when allowing the app to be used in different time zones, if the user travel's to Japan and records an event at 10pm JST, we want to ensure that when they travel back to England the app still shows the event recorded at 10pm not 2pm GMT.
Storing the date time at a UTC timestamp and localize the time to the user's device location when reading will result in this issue.

#### Solution
I identified two possible solutions for this problem.

##### Solution 1
Store a timestamp without time zone with the localized time if the event i.e 10pm (for the Japan example).
This means that dates have no understanding of timezones and we simply store the exact date and time of day of the event.
**Pros**
- This simplifies the reading of events there is no need to localize based on timezones 

**Cons**
- While this stores the time of day of the events it does not show the absolute time of the events, this would mean that we would not be able to create timelines or calculate the time between events

##### Solution 2
Although Postgres doesnt allow you to store dates with different timezones within a single column, we can create an an additional column to store the timezone of where the event was recorded.
In this solution we have 2 columns event_time (timestamp with timezone - which defaults to UTC in Postgres) and timezone (text - from the pg_timezone_names table e.g Asia/Tokyo).
When we need to query the time of day we can localize the UTC timestamp to the time zone in the timezone column.

**Pros**
- This allows us to interact with the absolute and relative times enabling time of day aggrigations and time between event calculation

**Cons**
- We have to maintain an additional column to store the timezone
- Additional complexity when reading times from the table
- Converting between time zones may make queryies slower

##### Chosen solution
**Solution 2**
Although there is a slight overhead of storing extra data and converting between time zones, it is likely to be negligible. 
Having access to both the relative and absolute times provides more opportunity to for varied analysis of the data.
