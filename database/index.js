const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const getRewards = function(resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  
    connection.query('SELECT * FROM rewards',
      function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results, 'logging results from rewards')
          resolve(results);
        }
      });
  
    connection.end();
  };


const getCategories = function(resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  
    connection.query('SELECT * FROM categories',
      function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results, 'logging results from categories')
          resolve(results);
        }
      });
  
    connection.end();
};

const categorizeReward = function(categoryId, rewardId, resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
            console.log('successfully connected to db!')
        }
    });

    connection.query(`INSERT INTO categories_rewards (categoryId, rewardId) VALUES (?, ?)`, [categoryId, rewardId],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(results, 'logging results from connection.query')
        resolve(results);
      }
    });
  
    connection.end();

};



module.exports = {
      getRewards, getCategories, categorizeReward
};