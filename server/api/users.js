const router = require('express').Router();

// matches GET requests to /api/users/
router.get('/', function(req, res, next) {
  res.send('no users yet');
});

module.exports = router;
