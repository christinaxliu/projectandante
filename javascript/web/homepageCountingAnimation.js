// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { fetchCountFromDb } from "backend/dbConnector.web"

$w.onReady(async function() {
    $w("#performanceCount").hide();
    $w("#performanceCountLoading").show();
    $w("#performerCount").hide();
    $w("#performerCountLoading").show();
    $w("#concertCount").hide();
    $w("#concertCountLoading").show();
    $w("#venueCount").hide();
    $w("#venueCountLoading").show();

    // Call backend web module to fetch various counts from MySQL (Google Cloud SQL) database
    let performanceCount = await fetchCountFromDb("mysqlConnections/performances");
    let performerCount = await fetchCountFromDb("mysqlConnections/performers");
    let concertCount = await fetchCountFromDb("mysqlConnections/concerts");
    let venueCount = await fetchCountFromDb("mysqlConnections/venues");

    // Custom event to trigger when the Numbers section is in viewport (in sight)
    // The custom event will kick off the number counting up animation
    $w("#numbersSection").onViewportEnter(async() => {
        $w("#performanceCountLoading").hide();
        $w("#performanceCount").show();
        $w("#performerCountLoading").hide();
        $w("#performerCount").show();
        $w("#concertCountLoading").hide();
        $w("#concertCount").show();
        $w("#venueCountLoading").hide();
        $w("#venueCount").show();

	    await countingUpNumber("#performanceCount", 0, performanceCount, "", "");
		await countingUpNumber("#performerCount", 0, performerCount, "", "");
		await countingUpNumber("#concertCount", 0, concertCount, "", "");
		await countingUpNumber("#venueCount", 0, venueCount, "", "");
	});

    // Run the animation to counting up number
    function countingUpNumber(element, startValue, endValue, prefix = "", suffix = "") {       
        const duration = 2000;
        const increment =  Math.max(Math.round((endValue - startValue) / (duration / 20)), 1);
        let currentValue = startValue;
     
        const timer = setInterval(() => {
            if (endValue - currentValue > 5) {
                currentValue += increment;
            } else if (currentValue < endValue) {
                currentValue += 1;
            }
            $w(element).text = prefix + `${(Math.round(currentValue)).toLocaleString('en-US')}${suffix}`;
     
            if (currentValue >= endValue) {
                clearInterval(timer);
            }
        }, 20);
    }
});
