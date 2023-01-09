/**
 * This module will start the express server
 * in package.json - start: node index.js
 */
const webapp = require('./server');

// (5) define the port
const port = 8080;

// webapp.listen(port, async () => {
//     db = await dbLib.connect(port);
// });

// start the server
webapp.listen(port, async () => {
  console.log(`Server running on port: ${port}`);
});
