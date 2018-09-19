var express = require('express');
const store = require('../sqlite_nodejs/store.js');
var router = express.Router();

function getDateFormat(date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
router.get('/test', async function(req, res, next) {
  let addDates = await store.addDates("10215264975716153", [{Date: "21/09/2018"}]);
  let dates = await store.getDates();
  res.send(dates);
});
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let dbDates = await store.getDates();
  let formatedDate = {};
  for(let date of dbDates) {
    if(!formatedDate[date.Date]) {
      formatedDate[date.Date] = [];
    }
    formatedDate[date.Date].push(date.User);
  }
  res.send(formatedDate);
});
router.post('/', async function(req, res, next) {
  let {dates, user} = req.body;
  await store.deleteUser(user.id);
  await store.addDates(user.id, dates);
  res.send(req.body);
});
module.exports = router;
