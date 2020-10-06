const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../dist'));

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
      let categoriesRewardsData = data;
      categoriesRewardsData.sort((a, b) => {
        return a.rewardId - b.rewardId;
      })    

      let categoriesRewardsMatrix = [];

      for (var i = 0; i < 5; i++) {
          let array = [0,0,0,0,0];
          categoriesRewardsMatrix.push(array);
      }

      for (var j = 0; j < categoriesRewardsData.length; j++) {
          let rewardIdArrayIndex = categoriesRewardsData[j].rewardId - 1;
          let categoryArrayIndex = categoriesRewardsData[j].categoryId - 1;
          categoriesRewardsMatrix[rewardIdArrayIndex][categoryArrayIndex] = 1;
      }

      data = categoriesRewardsMatrix;

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
      res.status(200);
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Error from categorizeReward! '});
      res.end();
    })

});

// Delete a Reward from a Category
app.delete('/api/categories_rewards', function(req, res) {
  let body = req.body;

  var deleteRewardCategory = function() {
    return new Promise((resolve, reject) => {
      db.deleteRewardCategory(body.categoryId, body.rewardId, resolve, reject)
    })
  }

  deleteRewardCategory().then((data) => {
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
