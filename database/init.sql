DROP DATABASE IF EXISTS ecom_vinyl;
CREATE DATABASE ecom_vinyl;

-- Switch to the new database (for psql execution)
\c ecom_vinyl

DROP TABLE IF EXISTS vinyls;

CREATE TABLE vinyls (
  product_id SERIAL PRIMARY KEY,
  vinyl_img VARCHAR(500),
  product_href VARCHAR(500),
  vinyl_title VARCHAR(100) NOT NULL,
  vinyl_artist VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  old_price DECIMAL(8,2),
  sale_label VARCHAR(50),
  low_stock_label VARCHAR(50),
  genre VARCHAR(100) NOT NULL,
  vinyl_description TEXT
);

INSERT INTO vinyls (vinyl_title, vinyl_artist, price, genre, vinyl_description) VALUES
  ('Dark Side of the Moon', 'Pink Floyd', 29.99, 'Progressive Rock', 'A classic album from 1973.'),
  ('Abbey Road', 'The Beatles', 34.99, 'Rock', 'The Beatles’ iconic 1969 release.');