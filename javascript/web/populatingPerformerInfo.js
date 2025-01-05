// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

// Import the backend web module method to fetch rows from MySQL db with performers' consents
// to display on the website and also meet the condition specified by the input parameters.
import { fetchConsentedRowsByConditionFromDb } from "backend/dbConnector.web"

const maxNumPerformers = 300;
const performerBoxElemPrefix = "#performerBox";
const performerPicElemPrefix = "#performerPic";
const performerNameElemPrefix = "#performerName";
const performerInstrumentsElemPrefix = "#performerInstruments";
const performerBioElemPrefix = "#performerBio";
const mobileElemPostfix = "-Mobile";

var totalNumPerformers = 0;

var performerPicSrcs = [];
var performerBackgroundPicSrcs = [];

// Set the performer background profile pic to the default pic initially.
// They will be set to the corresponding performer background profile pics after fetching performer data
// from database.
for (let i = 0; i < maxNumPerformers; i++) {
    performerBackgroundPicSrcs[i] = "wix:image://v1/33e592_d49e5c9b16b643d78f6555c207d69078~mv2.png/_.png#originWidth=407&originHeight=486";
}

// Helper method to randomly shuffle the input performers array.
function sufflePerformers(performers) {
    for (let i = performers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [performers[i], performers[j]] = [performers[j], performers[i]];
    }
    return performers;
}

// Helper method to populate performer information based on data read from database.
function populatePerformersInfo(performerResultsFromDb, numPreviousPerformers) {
    var performers = performerResultsFromDb.items;
    performers = sufflePerformers(performers);
	
    for (let i = 0; i < performers.length; i++) {
        let performerPicElem = $w(performerPicElemPrefix + (numPreviousPerformers + i));
        if (performerPicElem && performerPicElem != undefined && performerPicElem.length != 0) {
            performerPicElem.src = performers[i].profile_pic_uri;
            performerPicSrcs[numPreviousPerformers + i] = performers[i].profile_pic_uri;
            performerBackgroundPicSrcs[numPreviousPerformers + i] = performers[i].profile_background_pic_uri;
        }
		
        let performerNameElem = $w(performerNameElemPrefix + (numPreviousPerformers + i));
        if (performerNameElem && performerNameElem != undefined && performerNameElem.length != 0) {
            performerNameElem.text = performers[i].first_name + " " + performers[i].last_name;
        }
    
        let performerInstrumentsElem = $w(performerInstrumentsElemPrefix + (numPreviousPerformers + i));
        if (performerInstrumentsElem && performerInstrumentsElem != undefined && performerInstrumentsElem.length != 0) {
            performerInstrumentsElem.text = performers[i].instruments;
        }
	
        let performerBioElem = $w(performerBioElemPrefix + (numPreviousPerformers + i));
        if (performerBioElem && performerBioElem != undefined && performerBioElem.length != 0) {
            performerBioElem.text = performers[i].bio;
        }
		
        let elemMobileBio = $w(performerBioElemPrefix + (numPreviousPerformers + i) + mobileElemPostfix);
        if (elemMobileBio && elemMobileBio != undefined && elemMobileBio.length != 0) {
	    elemMobileBio.text = performers[i].bio;
        }
    }
}

$w.onReady(async function () {
    // Call backend web module to fetch half notes performers from MySQL (Google Cloud SQL) database.
    var halfNotePerformerResults = await fetchConsentedRowsByConditionFromDb(
        "mysqlConnections/performers",
        "andante_level",
        "Half Note Performer");
    populatePerformersInfo(halfNotePerformerResults, totalNumPerformers);
    totalNumPerformers += halfNotePerformerResults.items.length;

    // Call backend web module to fetch quarter notes performers from MySQL (Google Cloud SQL) database.
    var quarterNotePerformerResults = await fetchConsentedRowsByConditionFromDb(
        "mysqlConnections/performers",
        "andante_level",
        "Quarter Note Performer");
    populatePerformersInfo(quarterNotePerformerResults, totalNumPerformers);
    totalNumPerformers += quarterNotePerformerResults.items.length;

    // Call backend web module to fetch eighth notes performers from MySQL (Google Cloud SQL) database.
    var eighthNotePerformerResults = await fetchConsentedRowsByConditionFromDb(
        "mysqlConnections/performers",
        "andante_level",
        "Eighth Note Performer");
    populatePerformersInfo(eighthNotePerformerResults, totalNumPerformers);
    totalNumPerformers += eighthNotePerformerResults.items.length;

    // Call backend web module to fetch sixteenth notes performers from MySQL (Google Cloud SQL) database.
    var sixteenthNotePerformerResults = await fetchConsentedRowsByConditionFromDb(
        "mysqlConnections/performers",
        "andante_level",
        "Sixteenth Note Performer");
    populatePerformersInfo(sixteenthNotePerformerResults, totalNumPerformers);
    totalNumPerformers += sixteenthNotePerformerResults.items.length;
});

for (let i = 0; i < maxNumPerformers; i++) {
    let performerBoxElem = $w(performerBoxElemPrefix + i);
    let performerPicElem = $w(performerPicElemPrefix + i);
    if (performerBoxElem && performerBoxElem != undefined && performerBoxElem.length != 0
        && performerPicElem && performerPicElem != undefined && performerPicElem.length != 0) {
        performerBoxElem.onMouseIn((event) => {
            // User moves mouse inside the performer box element,
            // remember the performer's profile pic into the performerPicSrcs array,
            // and set the performer pic element's src to the corresponding background image.
            performerPicSrcs[i] = performerPicElem.src;
            performerPicElem.src = performerBackgroundPicSrcs[i];
        });

        performerBoxElem.onMouseOut((event) => {
            // User moves mouse outside the performer box element,
            // restore the performer pic element to the performer's profile pic.
            performerPicElem.src = performerPicSrcs[i];    
        });
    }
}
