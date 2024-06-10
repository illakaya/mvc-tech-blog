// use express to handle routes
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

// for api calls, be redirected to the api folder and index.js file
// this is for all endpoints involving api
router.use('/api', apiRoutes);
// for other endpoints, be redirected to the homeRoutes.js file
router.use('/', homeRoutes);

// export module to be used elsewhere
module.exports = router;
