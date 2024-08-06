/* USQL query to update performers’ andante levels and sort */
/* Drop the concert_counts_by_performers table if exists */
DROP TABLE IF EXISTS concert_counts_by_performers;


/* Create a new concert_counts_by_performers table to hold
  the results of counting concerts by performers */
CREATE TABLE concert_counts_by_performers (
  performer_id INT NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  school VARCHAR(255) NULL,
  grade INT NULL,
  concert_count INT NOT NULL,
  PRIMARY KEY(performer_id)
);


/* Populate concert_counts_by_performers table with results of counting
  concerts by performers */
INSERT INTO concert_counts_by_performers(performer_id, first_name, last_name, school, grade, concert_count)
SELECT
   performer_id,
   first_name,
   last_name,
   school,
   grade,
   concert_count
FROM
   (SELECT
       performers.performer_id AS performer_id,
       performers.first_name AS first_name,
       performers.last_name AS last_name,
       performers.school AS school,
       performers.grade AS grade,
       ps_count.concert_count AS concert_count
   FROM
       performers
   INNER JOIN
     (SELECT
           cp_table.performer_id AS performer_id,
           COUNT(DISTINCT(concert_id)) AS concert_count
       FROM
           (SELECT
               jsontable.performer_ids AS performer_id,            
               performances.concert_id AS concert_id
           FROM
               performances
           CROSS JOIN JSON_TABLE(CONCAT('["', REPLACE(performer_ids, ',', '","'), '"]'),
               '$[*]' COLUMNS (performer_ids VARCHAR(255) PATH '$')) jsontable
           ) AS cp_table
       GROUP BY
           cp_table.performer_id
     ) AS ps_count
   WHERE
       performers.performer_id = ps_count.performer_id
   ORDER BY
       concert_count DESC, grade DESC, first_name ASC, last_name ASC
   ) AS concert_count_results;


/* Update each performer in performers table with concert_count */
UPDATE
   performers p
INNER JOIN
   concert_counts_by_performers c
ON
   p.performer_id = c.performer_id
SET
  p.concert_count = c.concert_count;   


/* Update performers' andante_level to Half Note Performer if they participated
  in at least 10 concerts */
UPDATE
   performers p
INNER JOIN
   concert_counts_by_performers c
ON
   p.performer_id = c.performer_id AND c.concert_count >= 10
SET
  p.andante_level = "Half Note Performer";


/* Update performers' andante_level to Quarter Note Performer if they participated
  in at least 5 concerts */
UPDATE
   performers p
INNER JOIN
   concert_counts_by_performers c
ON
   p.performer_id = c.performer_id AND c.concert_count >= 5 AND c.concert_count < 10
SET
  p.andante_level = "Quarter Note Performer";


/* Update performers' andante_level to Eighth Note Performer if they participated
  in at least 3 concerts */
UPDATE
   performers p
INNER JOIN
   concert_counts_by_performers c
ON
   p.performer_id = c.performer_id AND c.concert_count >= 3 AND c.concert_count < 5
SET
  p.andante_level = "Eighth Note Performer";


/* Update performers' andante_level to Sixteenth Note Performer if they participated
  in at least 1 concerts */
UPDATE
   performers p
INNER JOIN
   concert_counts_by_performers c
ON
   p.performer_id = c.performer_id AND c.concert_count >= 1 AND c.concert_count < 3
SET
  p.andante_level = "Sixteenth Note Performer";