const express = require("express");
const app = express();
//const methodOverride = require('method-override');
//app.use((methodOverride('_method'));

const db = require("./db");
const syncAndSeed = db.syncAndSeed;
const Bookmark = db.models.Bookmark;

app.get("/", (req, res, next) => {
  //res.send("howdy");
  res.redirect("/bookmarks");
});

app.get("/bookmarks", async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll();

    const group = (arr) => {
      return arr.reduce((acc, link) => {
        acc[link.category] = acc[link.category] || 0;
        acc[link.category]++;
        return acc;
      }, {});
    };

    const grouped = group(bookmarks);

    res.send(`
            <html>
                <head>
                </head>
                <body>
                    <h1>Bookmarks!!!!!!</h1>
                    <ul>
                    	${Object.entries(grouped)
                        .map((entry) => {
                          return `
			                    <li><a href="/bookmarks/${entry[0]}">${entry[0]} (${entry[1]})</a></li>
		                       `;
                        })
                        .join("")}
                    </ul>
                </body>
            </html>
            `);
  } catch (ex) {
    next(ex);
  }
});

app.get("/bookmarks/:category", async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        category: req.params.category,
      },
    });
    res.send(`
                <html>
                    <head>
                    </head>
                    <body>
                        <a href='/bookmarks'>Back</a>
                        <h1>${req.params.category} (${bookmarks.length})</h1>
                    </body>
                </html>
            `);
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(3000, () => console.log("listening on port 3000"));
  } catch (ex) {
    console.log(ex);
  }
};

init();
