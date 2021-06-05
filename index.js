// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');
	
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
	
//   console.log('It worked! Returned IP:' , ip);
// });
	
// fetchCoordsByIP("99.245.49.160", (error, coordinates) => {
//     if (error) {
//         console.log("It didn't work!" , error);
//         return;
//     }
	
//     console.log('It worked! Returned coordinates: ',coordinates);
// });
	
// fetchISSFlyOverTimes( {latitude: '43.599', longitude: '-79.6885'}, (error,flyOverTimes) => {
//     if (error) {
//         console.log("It didn't work!" , error);
//         return;
//     }
	
//     console.log('It worked! Returned coordinates: ',flyOverTimes);
// });
	
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
	
	
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It did not work!" , error);
    return;
  }
	
  printPassTimes(passTimes);
});