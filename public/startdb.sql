CREATE TABLE account (
    user_id         serial      PRIMARY KEY,
    user_name       varchar(65) UNIQUE,
    user_email      varchar(90),
    user_password   varchar(90)
);
CREATE TABLE exercise (
    user_id         int             REFERENCES account(user_id),
    exercise_name   varchar(90)     NOT NULL,
    sets_reps_json  varchar(250)    NOT NULL
);