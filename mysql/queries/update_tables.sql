/* Update a performer’s data field in the performers table */
UPDATE
   performers
SET
   bio = "bio was updated"
WHERE
   performer_id = 1;

/* Update a venue’s data field in the venues table */
UPDATE
   venues
SET
   description = "description was updated"
WHERE
   venue_id = 1;

/* Update a venue’s data field in the concerts table */
UPDATE
  concerts
SET
  description = "description was updated"
WHERE
  concert_id = 1;

/* Update a performer’s data field in the performers table */
UPDATE
   performances
SET
   Performer_ids = '1,2,3'
WHERE
   performance_id = 1;