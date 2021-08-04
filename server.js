const express = require("express");
const app = express();
//const methodOverride = require('method-override');
//app.use((methodOverride('_method'));

const db = require("./db");
const syncAndSeed = db.syncAndSeed;
const User = db.models.User;

// app.get("/", (req, res, next) => {
//   res.redirect("/users");
// });

// app.get("/users", (req, res, next) => {
//   //res.send('TODO users');
//   try {
//     const users = await User.findAll();
//     res.send(`
//             <html>
//                 <head>
//                 </head>
//                 <body>
//                     <h1>Users</h1>
//                     ToDO show sates with user counts
//                 </body>
//             </html>
//         `);
//   } catch (ex) {
//     next(ex);
//   }
// });

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(3000, () => console.log("listening on port 3000"));
  } catch (ex) {
    console.log(ex);
  }
};

init();
