// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');
// see index.js for printPassTimes
// copy it from there, or better yet, moduralize and require it in both files

// Call
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });



/*If a promise is rejected (due to an error, like the ones we just tested, for example), and if we didn't attach an error-handling (catch) callback, then we will see a UnhandledPromiseRejectionWarning. */
//This is node telling us that we really should handle errors using catch for promises that fail (are rejected).