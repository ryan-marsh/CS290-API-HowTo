# CS290-API-HowTo

CS290-API-HowTo is a small express.js web app that serves a how-to guide for the Twitch API that was created for an Oregon State University CS290 - Web Development assignment.

#### To create a local instance of the how-to guide:  
1. Install [NodeJS](https://nodejs.org/)
2. Clone this repository
3. Obtain a [Twitch API Client ID](https://www.twitch.tv/settings/connections)
4. Insert your client ID at line 12 of apiCalls.js so it reads `var clientId = 'client_id=YOUR_CLIENT_ID';`
5. Run `node apiCalls.js` at the `CS290-API-HowTo/` directory.
6. Visit http://localhost:8080

#### The guide can also be [viewed online](https://twitch-api-howto.herokuapp.com/).
