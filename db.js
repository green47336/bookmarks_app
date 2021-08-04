const Sequelize = require("sequelize");
const conn = new Sequelize("postgres://localhost/bookmarks_db");

const Bookmark = conn.define("bookmark", {
  name: {
    type: Sequelize.DataTypes.STRING,
  },
  URL: {
    type: Sequelize.DataTypes.STRING,
  },
  category: {
    type: Sequelize.DataTypes.STRING,
  },
});

const syncAndSeed = async () => {
  await conn.sync({ force: true }); // it basically means "drop all tables if exists"

  const data = [
    {
      name: "LinkedIn",
      URL: "http://www.linkedin.com",
      category: "jobs",
    },
    {
      name: "Indeed",
      URL: "http://www.indeed.com",
      category: "jobs",
    },
    {
      name: "Amazon",
      URL: "http://www.amazon.com",
      category: "shopping",
    },
    {
      name: "W3C Shools - Javascript",
      URL: "https://www.w3schools.com/jsref/default.asp",
      category: "coding",
    },
    {
      name: "Target",
      URL: "http://www.shopping.com",
      category: "shopping",
    },
    {
      name: "The Weeknd",
      URL: "https://www.theweeknd.com/",
      category: "music",
    },
    {
      name: "Stack Overflow",
      URL: "https://stackoverflow.com/",
      category: "coding",
    },
  ];
  await Promise.all(data.map((bookmark) => Bookmark.create(bookmark)));
};
module.exports = {
  syncAndSeed,
  models: {
    Bookmark,
  },
};
