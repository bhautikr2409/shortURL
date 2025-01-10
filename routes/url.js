const express = require('express');
const {genearteNewShortURL , handleAnalytics} = require("../controlers/url")
const router = express.Router();

// Add request logging middleware
// router.use((req, res, next) => {
//     next();
// });

router.post('/', genearteNewShortURL)
router.get('/analytics/:shortId', handleAnalytics)

module.exports = router 