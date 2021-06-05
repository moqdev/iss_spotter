// index.js
const { fetchMyIP,fetchCoordsByIP  } = require('./iss');

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