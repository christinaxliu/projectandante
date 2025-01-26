// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { fetchRowsByConditionFromDb } from "backend/dbConnector.web"
import { fetchRowsByConditionAndSortAscendingFromDb } from "backend/dbConnector.web"

const profilePicElemPrefix = "#leaderPic";
const nameElemPrefix = "#leaderName";
const positionElemPrefix = "#leaderPosition";
const bioElemPrefix = "#leaderBio";
const mobileElemPostfix = "-Mobile";

function populateLeadersInfo(leaderResultsFromDb, numLeadersWithInfoPopulated) {
    // Update leaders' information
    // There are numPreLeaders before this group of leaders, so the leader index in the loop to locate the
    // corresponding elements is: numPreLeaders + i
    var leaders = leaderResultsFromDb.items;
    for (let i = 0; i < leaders.length; i++) {
        let leaderElemIndex = numLeadersWithInfoPopulated + i;
        $w(profilePicElemPrefix + leaderElemIndex).src = leaders[i].profile_pic_uri;
        $w(nameElemPrefix + leaderElemIndex).text = leaders[i].first_name + " " + leaders[i].last_name;
        $w(positionElemPrefix + leaderElemIndex).text = leaders[i].position;
        $w(bioElemPrefix + leaderElemIndex).text = leaders[i].bio;
        let elemMobileBio = $w(bioElemPrefix + leaderElemIndex + mobileElemPostfix);
        if (elemMobileBio && elemMobileBio != undefined && elemMobileBio.length != 0) {
            elemMobileBio.text = leaders[i].bio;
        }
    }
}

$w.onReady(async function () {
    var numLeadersWithInfoPopulated = 0;

    // Call backend web module to fetch co-founders from MySQL (Google Cloud SQL) database
    var cofounderResults = await fetchRowsByConditionFromDb(
        "mysqlConnections/leaders",
        "position_level",
        "Co-Founder");

    // Populate co-founders' information
    populateLeadersInfo(cofounderResults, numLeadersWithInfoPopulated);
    numLeadersWithInfoPopulated += cofounderResults.items.length;

    // Call backend web module to fetch directors from MySQL (Google Cloud SQL) database
    var directorResults = await fetchRowsByConditionAndSortAscendingFromDb(
        "mysqlConnections/leaders",
        "position_level",
        "Director",
        "sequence_in_postition_level");

    // Populate directors' information
    populateLeadersInfo(directorResults, numLeadersWithInfoPopulated);
    numLeadersWithInfoPopulated += directorResults.items.length;

    // Call backend web module to fetch committee from MySQL (Google Cloud SQL) database
    var committeeResults = await fetchRowsByConditionAndSortAscendingFromDb(
        "mysqlConnections/leaders",
        "position_level",
        "Committee",
        "sequence_in_postition_level");

    // Populate committee's information
    populateLeadersInfo(committeeResults, numLeadersWithInfoPopulated);
    numLeadersWithInfoPopulated += committeeResults.items.length;
});
