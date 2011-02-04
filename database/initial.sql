---
--- Initial database schema used for the sustainablecorn project
---

CREATE TABLE people(
	id SERIAL PRIMARY KEY,
	prefix varchar,
	fname varchar,
	lname varchar,
	email varchar,
	homepage varchar,
	affiliation varchar,
	phone varchar,
	role smallint);
	
GRANT SELECT on people to nobody;