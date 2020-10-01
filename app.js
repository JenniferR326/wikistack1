const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');

db.authenticate().then(() => {
  console.log('connected to database');
});
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
  res.send(layout(''));
});

const port = 3000;

const init = async () => {
  await Page.sync();
  await User.sync();
  await db.sync();
  console.log('DB has been synced')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}
init();




