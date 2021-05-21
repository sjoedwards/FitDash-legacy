require("dotenv").config({ path: "../.env" });
var app = require("./app");
var createResultsStructure = require("./util/createResultsStructure");
var start = function () {
    createResultsStructure();
};
app.listen(3000, function () {
    /* eslint-disable-next-line no-console */
    console.log("Listening on port 3000");
});
start();
