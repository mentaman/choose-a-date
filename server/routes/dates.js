var express = require('express');
const graph = require('fbgraph');
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
router.get('/me', async function(req, res, next) {
  console.log(req.query);
  let userId = req.query.userId;
  let dbDates = await store.getUser(userId);
  res.send(dbDates.map(date => date.Date));
});
function graphGetAsPromise(url) {
  return new Promise((resolve, reject) => {
    graph.get(url, function(err, res) {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
    });
  });
  
}
router.post('/', async function(req, res, next) {
  let {dates, user} = req.body;
  let myFacebook = await graphGetAsPromise(`me?access_token=${user.accessToken}`);
  if(!user.id || user.id !== myFacebook.id) {
    next(new Error("auth"));
  } else {
    await store.deleteUser(user.id);
    if(dates.length > 0) {
      await store.addDates(user.id, dates);
    }
    res.send("good");
  }
});
module.exports = router;
