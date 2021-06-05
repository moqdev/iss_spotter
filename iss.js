/**
	 * Makes a single API request to retrieve the user's IP address.
	 * Input:
	 *   - A callback (to pass back an error or the IP string)
	 * Returns (via Callback):
	 *   - An error, if any (nullable)
	 *   - The IP address as a string (null if error). Example: "162.245.144.188"
	 */


const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body)=>{
 
    //inside the request callback ...
    //error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data

    if (response.statusCode === 200) {
      const ip = JSON.parse(body);
      //console.log(ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let apiURL = 'https://freegeoip.app/json/' + ip;
 
  request(apiURL, (error, response, body) => {
    if (error) return callback(error, null);
  
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const data = {};
    data.latitude = JSON.parse(body).latitude;
    data.longitude = JSON.parse(body).longitude;
    callback(null, data);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  let apiURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  // console.log(apiURL);
  request(apiURL, (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};





module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };