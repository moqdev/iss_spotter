/**
	 * Makes a single API request to retrieve the user's IP address.
	 * Input:
	 *   - A callback (to pass back an error or the IP string)
	 * Returns (via Callback):
	 *   - An error, if any (nullable)
	 *   - The IP address as a string (null if error). Example: "162.245.144.188"
	 */
 const request = require('request');
	 
 const fetchMyIP = function(callback) {
    request('https://api.ipify.org?format=json', (error, response, body) => {
      if (error) return callback(error, null);
  
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
        return;
      }
  
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    });
  };


const fetchCoordsByIP = function(ip, callback) {
    let apiURL = 'https://freegeoip.app/json/' + ip;
    // console.log(apiText);
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

  const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
          return callback(error, null);
        }
    
        fetchCoordsByIP(ip, (error, loc) => {
          if (error) {
            return callback(error, null);
          }
    
          fetchISSFlyOverTimes(loc, (error, nextPasses) => {
            if (error) {
              return callback(error, null);
            }
    
            callback(null, nextPasses);
          });
        });
    });
  }

  module.exports = { fetchMyIP };
  module.exports = { fetchCoordsByIP };
  module.exports = { fetchISSFlyOverTimes };
  module.exports = { nextISSTimesForMyLocation };
  