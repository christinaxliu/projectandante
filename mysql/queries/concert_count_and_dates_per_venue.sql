SELECT
    v.name AS venue_name,
    COUNT(c.concert_id) AS concert_count,
    GROUP_CONCAT(c.concert_date ORDER BY c.concert_date DESC SEPARATOR ' , ') AS concert_dates
FROM
    venues v
INNER JOIN
    concerts c
ON
    v.venue_id = c.venue_id
GROUP BY
    v.venue_id
ORDER BY
    concert_dates DESC, concert_count DESC;
