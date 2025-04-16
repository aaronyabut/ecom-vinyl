DROP DATABASE IF EXISTS ecom_vinyl;
CREATE DATABASE ecom_vinyl;

-- Switch to the new database (for psql execution)
\c ecom_vinyl

DROP TABLE IF EXISTS vinyls;

CREATE TABLE vinyls (
  product_id SERIAL PRIMARY KEY,
  vinyl_img VARCHAR(500),
  product_href VARCHAR(500),
  vinyl_title VARCHAR(200) NOT NULL,
  vinyl_artist VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  old_price DECIMAL(8,2),
  sale_label VARCHAR(50),
  low_stock_label VARCHAR(50),
  no_stock_label VARCHAR(50),
  genre VARCHAR(100) NOT NULL,
  vinyl_description TEXT,
  vinyl_info TEXT,
  playlist_name VARCHAR(100),
  tracklist TEXT,
  companies TEXT,
  main_artists TEXT,
  songwriters TEXT
);

\copy vinyls (product_id, vinyl_img, product_href, vinyl_title, vinyl_artist, price, old_price, sale_label, low_stock_label, no_stock_label, genre, vinyl_description, vinyl_info, playlist_name, tracklist, companies, main_artists, songwriters ) FROM '/Users/aaronyabut/ecomVinylProject/ecom-vinyl/data/vinyls-data.csv' WITH (FORMAT csv, HEADER true);