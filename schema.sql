DROP DATABASE IF EXISTS rewards;

CREATE DATABASE rewards;

USE rewards;

CREATE TABLE rewards (
  rewardId int NOT NULL AUTO_INCREMENT,
  rewardName varchar(40) NOT NULL,
  PRIMARY KEY (rewardId)
);

CREATE TABLE categories (
  categoryId int NOT NULL AUTO_INCREMENT,
  categoryName varchar(50) NOT NULL,
  PRIMARY KEY (categoryId)
);

CREATE TABLE categories_rewards (
  categoryId int NOT NULL,
  rewardId int NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(categoryId),
  FOREIGN KEY (rewardId) REFERENCES rewards(rewardId)
);

INSERT INTO rewards (rewardId, rewardName) VALUES (1, "Free Gift Card");
INSERT INTO rewards (rewardId, rewardName) VALUES (2, "300 Free Miles ");
INSERT INTO rewards (rewardId, rewardName) VALUES (3, "Free Dinner");
INSERT INTO rewards (rewardId, rewardName) VALUES (4, "$100 Gift Card to Starbucks");
INSERT INTO rewards (rewardId, rewardName) VALUES (5, "Free Laptop");

INSERT INTO categories (categoryId, categoryName) VALUES (1, "Finances");
INSERT INTO categories (categoryId, categoryName) VALUES (2, "Travel");
INSERT INTO categories (categoryId, categoryName) VALUES (3, "Food");
INSERT INTO categories (categoryId, categoryName) VALUES (4, "Social");
INSERT INTO categories (categoryId, categoryName) VALUES (5, "Technology");