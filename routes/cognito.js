var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('test new return get method');
});

router.post('/formData', function(req, res, next) {

  var myJSON = JSON.stringify(req.body);
  fs.writeFile('demofile1.txt', myJSON, function (err) {
    if (err) throw err;
    console.log('Saved!');
    console.log(req.body);
    res.json("test new data");
  });

  });

module.exports = router;
