/* Insert a performer into performers table */
INSERT INTO performers(first_name, last_name, school, grade, instruments, bio, profile_pic_uri, profile_background_pic_uri, consent_for_website)
VALUES("Christina", "Liu", "Lakeside School", 11, "Cellist/Guitarist", "bio to be updated", "profile pic uri", "profile background pic url", 1);

/* Insert a venue into venues table */
INSERT INTO venues(name, address, phone_number, website)
VALUES("Emerald Heights", "10901 176th Cir NE, Redmond, WA 98052", "(425)556-8100", "https://www.emeraldheights.com/");

/* Insert a concert into concerts table */
INSERT INTO concerts(venue_id, year, month, day)
VALUES(1, 2022, 8, 19);

/* Insert a performance into performances table */
INSERT INTO performances(concert_id, performer_ids)
VALUES(1, '1,2');

/* Insert a leader into leaders table */
INSERT INTO leaders(leader_id, first_name, last_name, position, position_level, sequence_in_postition_level, bio, profile_pic_uri)
VALUES(1, "Christina", "Liu", "Co-Founder", "Co-Founder", 1, "bio to be updated", "profile pic uri");
