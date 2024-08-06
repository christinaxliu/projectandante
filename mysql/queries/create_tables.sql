/* Create performers table */
CREATE TABLE performers (
   performer_id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   middle_name VARCHAR(255) NULL,
   school VARCHAR(255) NULL,
   grade INT NULL,
   instruments VARCHAR(255) NULL,
   andante_level VARCHAR(255) NULL,
   concert_count INT NULL,
   bio TEXT NULL,
   PRIMARY KEY(performer_id)
);

/* Create venues table */
CREATE TABLE `main_db`.venues (
   venue_id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   address VARCHAR(1023) NOT NULL,
   phone_number VARCHAR(255) NULL,
   contact_email VARCHAR(255) NULL,
   website VARCHAR(255) NULL,
   description TEXT NULL,
   PRIMARY KEY(venue_id)
);

/* Create concerts table */
CREATE TABLE `main_db`.concerts (
   concert_id INT NOT NULL AUTO_INCREMENT,
   venue_id INT NOT NULL,
   year INT NOT NULL,
   month INT NOT NULL,
   day INT NULL,
   description TEXT NULL,
   photos_link VARCHAR(2047) NULL,
   videos_link VARCHAR(2047) NULL,
   PRIMARY KEY(concert_id)
);

/* Create performs table */
CREATE TABLE performances (
  performance_id INT NOT NULL AUTO_INCREMENT,
  concert_id INT NOT NULL,
  performer_ids VARCHAR(255) NOT NULL,
  performance_piece_name VARCHAR(255) NULL,
  performance_type VARCHAR(255) NULL,
  description TEXT NULL,
  PRIMARY KEY(performance_id)
);