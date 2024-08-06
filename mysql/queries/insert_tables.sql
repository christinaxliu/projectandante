/* Insert a performer into performers table */
INSERT INTO performers(first_name, last_name, school, grade, instruments, bio)
VALUES("Christina", "Liu", "Lakeside School", 11, "Cellist/Guitarist", "bio to be updated");

/* Insert a venue into venues table */
INSERT INTO venues(name, address, phone_number, website)
VALUES("Emerald Heights", "10901 176th Cir NE, Redmond, WA 98052", "(425)556-8100", "https://www.emeraldheights.com/");

/* Insert a concert into concerts table */
INSERT INTO concerts(venue_id, year, month, day)
VALUES(1, 2022, 8, 19);

/* Insert a performance into performances table */
INSERT INTO performances(concert_id, performer_ids)
VALUES(1, '1,2');