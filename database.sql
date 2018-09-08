CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (80) NOT NULL
);

CREATE TABLE "therapist_info" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "first_name" VARCHAR (1000),
    "last_name" VARCHAR (1000)
);

CREATE TABLE "patient_info" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
	"therapist_id" INT
);

CREATE TABLE "daily_log" (
    "id" SERIAL PRIMARY KEY,
    "depression_rating" INT NOT NULL,
    "activity" VARCHAR (1000) NOT NULL,
    "date" VARCHAR (25),
    "time" time,
    "patient_id" INT
);