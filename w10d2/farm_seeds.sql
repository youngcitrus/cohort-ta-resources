CREATE TABLE edible_seeds(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    type VARCHAR,
    price_per_pound FLOAT,
    in_stock BOOLEAN
)

INSERT INTO edible_seeds
    (name, type, price_per_pound, in_stock)
    VALUES
    ('CHIA', 'Pseudocereal', 6.95, true);

