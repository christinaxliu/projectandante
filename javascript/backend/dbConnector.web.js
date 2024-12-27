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
    (dbCollectionTableName) => { 
        let options = {
          "suppressAuth": true
        };

        return wixData.query(dbCollectionTableName)
            .count(options)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return 0;
            }
        );
    }
);

// Backend web module function to fetch rows that satisfy condition from MySQL (Google Cloud SQL) database.
// The condition is specified by the input parameters: conditionColumnName and conditionColumnValue. The rows
// that satisfy the following conditions will be returned:
//   column_name == column_value
export const fetchRowsByConditionFromDb = webMethod(
    Permissions.Anyone, 
    (dbCollectionTableName, conditionColumnName, conditionColumnValue) => { 
        let options = {
          "suppressAuth": true
        };

        return wixData.query(dbCollectionTableName)
            .eq(conditionColumnName, conditionColumnValue)
            .find(options)
            .then((results) => {
                return results;
            })
            .catch((error) => {
                return 0;
            }
        );
    }
);

// Backend web module function to fetch rows that satisfy condition from MySQL (Google Cloud SQL) database and
// sort the results in the ascending order on the column specified by the orderByColumnName input parameter.
// The condition is specified by the input parameters: conditionColumnName and conditionColumnValue. The rows
// that satisfy the following conditions will be returned:
//   column_name == column_value
export const fetchRowsByConditionAndSortAscendingFromDb = webMethod(
    Permissions.Anyone, 
    (dbCollectionTableName, conditionColumnName, conditionColumnValue, orderByColumnName) => { 
        let options = {
          "suppressAuth": true
        };

        return wixData.query(dbCollectionTableName)
            .eq(conditionColumnName, conditionColumnValue)
            .ascending(orderByColumnName)
            .find(options)
            .then((results) => {
                return results;
            })
            .catch((error) => {
                return 0;
            }
        );
    }
);
