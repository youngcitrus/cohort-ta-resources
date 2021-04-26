DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS boardgames;
DROP TABLE IF EXISTS people;

CREATE TABLE boardgames (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    avg_rating NUMERIC(3,2),
    max_players INTEGER,
    category VARCHAR(50)
);

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    fave_category VARCHAR(50)
);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    content TEXT,
    boardgame_id INTEGER REFERENCES boardgames(id)
);

ALTER TABLE people ADD COLUMN prefers_video_games BOOLEAN default false;


INSERT INTO boardgames
    (name, avg_rating, max_players, category)
VALUES
    ('Gloomhaven', 8.8, 4, 'Adventure'),
    ('Pandemic Legacy: Season 1', 8.62, 4, 'Cooperative'),
    ('Brass: Birmingham', 8.66, 4, 'Economic'),
    ('Terraforming Mars', 8.43, 5, 'Economic'),
    ('Twilight Imperium: Fourth Edition', 8.7, 6, 'Strategy'),
    ('Spirit Island', 8.34, 4, 'Cooperative'),
    ('Mage Knight', 8.1, 4, 'Adventure'),
    ('Rising Sun', 7.88, 5, 'Strategy');
INSERT INTO people
    (name, fave_category, prefers_video_games)
VALUES
    ('Alec', 'Strategy', DEFAULT),
    ('Mitchell', 'Cooperative', DEFAULT),
    ('Chris', 'Adventure', DEFAULT),
    ('JM', 'Economic', DEFAULT),
    ('Tom', 'Strategy', DEFAULT),
    ('Bart', 'Economic', DEFAULT);
INSERT INTO reviews
    (content, boardgame_id)
VALUES
    ('There is nothing I love more than escaping one pandemic for another, 10/10', 2),
    ('This game is far too long!', 5),
    ('My friends and I really like this game, lots of replayability', 6),
    ('I can be a space pirate, favorite game hands down.', 5);

UPDATE people
SET prefers_video_games = TRUE
WHERE name IN ('Alec', 'JM');

DELETE FROM boardgames
WHERE category IN ('Adventure', 'Economic')