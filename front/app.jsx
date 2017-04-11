import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Navbar from './Navbar'
import WelcomePage from './WelcomePage'
import Artists from './Artists'
import Songs from './Songs'
import NewSongs from './NewSongs'
import Playlists from './Playlists'
import NewPlaylist from './NewPlaylist'
import Playlist from './Playlist'
import AddSongToPlaylist from './AddSongToPlaylist'
import $ from 'jquery'
import Login from './Login'

const App = React.createClass({
  getInitialState() {
    return {username: '', playlists: [], playlist: null, songs: [], artists: []};
  },
  componentDidMount() {
    $.ajax({
      url: '/auth',
      method:'GET'
    })
    .done((username) => {
      console.log(username)
      if(username) {
        console.log(username + ' is logged in!');
        this.setState({username: username});
      } else {
        console.log('No one is logged in');
      }
    })
  },
  render() {
    return (
      <div>
        <Navbar />
        {this.state.username ? <p>{'Welcome ' + this.state.username}</p> : <Login /> }
        {this.props.children}
      </div>
    )
  }
})

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={WelcomePage} />
      <Route path="artists" component={Artists} />
      <Route path="songs" component={Songs} />
      <Route path="/songs/newsong" component={NewSongs} />
      <Route path="/playlists" component={Playlists} />
      <Route path="/playlists/newPlaylist" component={NewPlaylist} />
      <Route path="/playlists/:playlistId" component={Playlist} />
      <Route path="/playlists/:playlistId/songs" component={AddSongToPlaylist} />
    </Route>
  </Router>,
	document.getElementById('app')
	)