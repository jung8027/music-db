const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const session = require('express-session')

app.use(express.static(path.join(__dirname, '/front/bundle')));

//ROUTES//
const router = require('./routes');
const artistsRoute = router.artistsRoute;
const songsRoute = router.songsRoute;
const playlistsRoute = router.playlistsRoute;
const genresRoute = router.genresRoute;
const authRoute = router.authRoute;
const loginRoute = router.loginRoute


//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 9999 & create required tables
sequelizeConnection.sync().then(function() {
  app.listen(9999, () => console.log('Listening on port 9999'))
})

//establish express session//
app.use(session({
  secret: 'the maze is not for you',
  resave: true,
  saveUninitialized: true
}))


//ROUTER URL PATHS//
app.use('/login', loginRoute);
app.use('/api/artists', artistsRoute);
app.use('/api/songs', songsRoute);
app.use('/api/playlists', playlistsRoute);
app.use('/api/genres', genresRoute);
app.use('/auth', authRoute);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/index.html'));
});