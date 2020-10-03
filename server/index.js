const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../dist'));

// app.use(express.static('App.js'))
app.set('port', PORT)

// Get All Rewards
app.get('/api/rewards', function(req, res) {
    var getRewards = function() {
        return new Promise((resolve, reject) => {
            db.getRewards(resolve, reject);
        });
    };

    console.log('reached get req')

    getRewards().then((data) => {
        // console.log(data, "logging data from getRewards");
        res.status(200);
        res.send(data);
      }).catch((err) => {
        res.status(404).send({ error: 'Something failed!' })
        console.log(err, "error was reached :(");
      })

});

// Get All Categories
app.get('/api/categories', function(req, res) {
    var getCategories = function() {
        return new Promise((resolve, reject) => {
            db.getCategories(resolve, reject);
        });
    };

    console.log('reached get req')

    getCategories().then((data) => {
        // console.log(data, "logging data from getCategories");
        res.status(200);
        res.send(data);
      }).catch((err) => {
        res.status(404).send({ error: 'Something failed!' })
        console.log(err, "error was reached :(");
      })
});

// Get All Rewards and Current Categories
app.get('/api/categories_rewards', function(req, res) {
  var getCategoriesRewards = function() {
      return new Promise((resolve, reject) => {
          db.getCategoriesRewards(resolve, reject);
      });
  };

  getCategoriesRewards().then((data) => {
      // console.log(data, "logging data from getCategoriesRewards");
      res.status(200);
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Something failed!' })
      console.log(err, "error was reached :(");
    })
});

// Post Reward having a New Category
app.post('/api/categorize', (req, res) => {
    let body = req.body;

    var categorizeReward = function() {
      return new Promise((resolve, reject) => {
        db.categorizeReward(body.categoryId, body.rewardId, resolve, reject)
      })
    }

    categorizeReward().then((data) => {
      console.log(data, 'logging data from categorizeReward')
      res.status(200);
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Error from categorizeReward! '});
      res.end();
    })

});

// Delete a Reward from a Category
app.delete('/api/categories_rewards', function(req, res) {
  // console.log(req, 'line 98 logging req')
  let body = req.body;
  console.log(body, 'line 99')

  var deleteRewardCategory = function() {
    return new Promise((resolve, reject) => {
      db.deleteRewardCategory(body.categoryId, body.rewardId, resolve, reject)
    })
  }

  deleteRewardCategory().then((data) => {
    console.log(data, 'logging data from deleteRewardCategory')
    res.status(200);
    res.send(data);
  }).catch((err) => {
    res.status(404).send({ error: 'Error from deleteRewardCategory! '});
    res.end();
  })

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
