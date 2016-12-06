import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'

const Playlists = React.createClass({
  getInitialState(){
    return {playlists:[]}
  },
  componentDidMount(){
  $.ajax({
  	url: '/api/playlists',
  	method: 'GET',
  })
  .done(data=>this.setState({playlists: data}))
  },
  deletePlaylist(id){
  // $.ajax({
  // 	url: '/api/playlists'+id,
  // 	method: 'DELETE',
  // })
  console.log(id)
  },
	render(){
		return(
			<div>
			  <h2>PLAYLISTS:</h2>
			  <h3>New Playlist</h3><Link to='/playlists/newPlaylist'><input type="button" value="+" /></Link>
				{this.state.playlists.map((element, index)=>(
					<div key={index}>
						<Link to={'/playlists/'+element.id}><h3>{element.title}</h3></Link>
						<input type="button" value="+" />
						<input type="button" value="-" onClick={this.deletePlaylist.bind(this,element.id)}/>
					</div>
				))
				}
			</div>
			)
	}
})

export default Playlists