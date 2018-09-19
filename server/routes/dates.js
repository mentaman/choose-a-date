var express = require('express');
var router = express.Router();

function getDateFormat(date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    "20/8/2018": ["10215264975716153"]
  });
});
router.post('/', function(req, res, next) {
  let {dates, user} = req.body;
  res.send(req.body);
});
module.exports = router;
