// index.js
//const { fetchMyIP,fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// index.js

const { nextISSTimesForMyLocation } = require('./iss');

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
    return console.log("It didn't work!", error);
  }
 
  printPassTimes(passTimes);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
	
//   console.log('It worked! Returned IP:' , ip);
// });
	
// fetchCoordsByIP("24.53.254.35", function(error, data) {
//   if (error) console.log(error);
//   if (data) console.log(data);
// });

// fetchISSFlyOverTimes({latitude: '43.6752', longitude: '-79.3472'}, (error,flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates: ',flyOverTimes);
// });

module.exports = {printPassTimes};