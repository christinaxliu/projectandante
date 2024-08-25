/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

****/

/**** Call the sample fetchCountFromDb function below by pasting the following into your page code:

import { fetchCountFromDb } from 'backend/dbConnector.web';

$w.onReady(async function() {
    await fetchCountFromDb("mysqlConnections/performances");;
});

****/

import { Permissions, webMethod } from "wix-web-module";
import wixData from "wix-data";

// Backend web module function to fetch count from MySQL (Google Cloud SQL) database
export const fetchCountFromDb = webMethod(
    Permissions.Anyone, 
    (dbConnnectionName) => { 
        let options = {
          "suppressAuth": true
        };

        return wixData.query(dbConnnectionName)
            .find(options)
            .then((results) => {
                return results.totalCount;
            })
            .catch((err) => {
                return 0;
            }
        );
    }
);
