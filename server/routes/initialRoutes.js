const express = require("express");
const router = express.Router();
const pool = require("./connection");
const readtime = require("estimated-read-time");
const faker = require("faker");

// let result = faker.lorem.paragraphs((nb = 10));

// var result2 = readtime.text(result);
// console.log(result);
// console.log(Math.round(result2.seconds / 60));
// console.log(result2.seconds);

let articles = [];

router.get("/startApp", (req, res) => {
  let header = req.header("Authorization");
  console.log("Header", header);
  articles = [];
  console.log("Testing this out");
  for (i = 0; i < 10; i++) {
    let paragraphs = Math.round(Math.random() * 20);
    //   console.log(paragraphs)
    let article = {
      title: faker.lorem.words((nb = 4)),
      src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      text: faker.lorem.paragraphs((nb = paragraphs)),
      flex: 12,
      id: i
    };
    articles.push(article);
  }
  articles.forEach((el, index) => {
    //   el.readTime = Math.round(readtime.text(el.text.seconds)/60)
    el.word_count = readtime.text(el.text).word_count;
    el.readtime = Math.round(readtime.text(el.text).seconds / 60);
    el.text = el.text.substring(0, 250) + "...";

    if (index === 0) {
      el.flex = 12;
    } else if (index === 1 || index === 2) {
      el.flex = 6;
    }
  });
  for (i = 2; i < articles.length; i++) {
    if (articles[i - 1].flex === 12 || articles[i - 2].flex === 12) {
      articles[i].flex = 6;
    }
  }
  for (i = 1; i < articles.length; i++) {
    if (articles[i - 1].flex === 12) {
      articles[i].src = "https://cdn.vuetifyjs.com/images/cards/road.jpg";
    }
  }
  for (i = 2; i < articles.length; i++) {
    if (articles[i - 2].flex === 12) {
      articles[i].src = "https://cdn.vuetifyjs.com/images/cards/plane.jpg";
    }
  }
  res.json(articles);
});

module.exports = router;
