// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { fetchRowsByConditionFromDb } from "backend/dbConnector.web"
import { fetchRowsByConditionAndSortAscendingFromDb } from "backend/dbConnector.web"

$w.onReady(async function () {
    const profilePicElemPrefix = "#leaderPic";
    const nameElemPrefix = "#leaderName";
    const positionElemPrefix = "#leaderPosition";
    const bioElemPrefix = "#leaderBio";
    const mobileElemPostfix = "-mobile";

    // Call backend web module to fetch co-founders from MySQL (Google Cloud SQL) database
    var cofounderResults = await fetchRowsByConditionFromDb("mysqlConnections/leaders",
                                                            "position_level",
                                                            "Co-Founder");
    var coFounders = cofounderResults.items;
    var numCoFounders = coFounders.length;

    // Update co-founders's information
    for (let i = 0; i < coFounders.length; i++) {
        $w(profilePicElemPrefix + i).src = coFounders[i].profile_pic_uri;
        $w(nameElemPrefix + i).text = coFounders[i].first_name + " " + coFounders[i].last_name;
        $w(positionElemPrefix + i).text = coFounders[i].position;
        $w(bioElemPrefix + i).text = coFounders[i].bio;
        let elemMobileBio = $w(bioElemPrefix + i + mobileElemPostfix);
        if (elemMobileBio && elemMobileBio != undefined && elemMobileBio.length != 0) {
            elemMobileBio.text = coFounders[i].bio;
        }
    }

    // Call backend web module to fetch directors from MySQL (Google Cloud SQL) database
    var directorResults = await fetchRowsByConditionAndSortAscendingFromDb("mysqlConnections/leaders",
	                                                                   "position_level",
                                                                           "Director",
                                                                           "sequence_in_postition_level");
    var directors = directorResults.items;
    var numDirectors = directors.length;

    // Update directors's information
    // There are numCoFounders before the directors, so the director index in the loop to locate the corresponding
    // elements is: numCoFounders + i
    for (let i = 0; i < directors.length; i++) {
        let leaderElemIndex = numCoFounders + i;
        $w(profilePicElemPrefix + leaderElemIndex).src = directors[i].profile_pic_uri;
        $w(nameElemPrefix + leaderElemIndex).text = directors[i].first_name + " " + directors[i].last_name;
        $w(positionElemPrefix + leaderElemIndex).text = directors[i].position;
        $w(bioElemPrefix + leaderElemIndex).text = directors[i].bio;
    }
});

