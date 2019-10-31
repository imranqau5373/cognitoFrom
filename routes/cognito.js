var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('test new return get method');
});

router.post('/formData', function(req, res, next) {

    res.json("test new data");
  });

module.exports = router;
