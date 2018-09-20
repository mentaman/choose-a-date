var express = require('express');
const graph = require('fbgraph');
const store = require('../sqlite_nodejs/store.js');
var router = express.Router();

function getDateFormat(date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
router.get('/test', async function(req, res, next) {
  try {
    let createTable = await store.migrate();
    let addDates = await store.addDates("10215264975716153", [{Date: "21/09/2018"}]);
    let dates = await store.getDates();
    res.send(dates);
  } catch(e) {
    next(e);
  }
});
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let dbDates = await store.getDates();
    let formatedDate = {};
    for(let date of dbDates) {
      if(!formatedDate[date.Date]) {
        formatedDate[date.Date] = [];
      }
      formatedDate[date.Date].push(date.User);
    }
    res.send(formatedDate);
  } catch(e) {
    next(e);
  }
});
router.get('/me', async function(req, res, next) {
  try {
    let userId = req.query.userId;
    let dbDates = await store.getUser(userId);
    res.send(dbDates.map(date => date.Date));
  } catch(e) {
    next(e);
  }
  
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
  try {
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
  } catch(e) {
    next(e);
  }
  
});
module.exports = router;
