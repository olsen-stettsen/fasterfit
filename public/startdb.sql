CREATE TABLE account (
    user_id         serial      PRIMARY KEY,
    user_name       varchar(65) NOT NULL,
    user_email      varchar(90),
    user_password   varchar(90)
);
CREATE TABLE exercise (
    user_id         int             REFERENCES account(user_id),
    exercise_name   varchar(90)     NOT NULL,
    sets_reps_json  varchar(250)    NOT NULL
);
INSERT INTO account VALUES ('testuser', 'testuser@tu.com', '1234');
INSERT INTO exercise VALUES ((SELECT user_id FROM account WHERE user_name='testuser'), 'Bench', '{"sets":["255,12","315,8","335,6","355,3"],"name":"Bench","year":2019,"month":3,"day":7,"hour":10,"minutes":59}');