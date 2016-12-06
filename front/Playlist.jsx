import React from 'react'
import $ from 'jquery'

const Playlist = React.createClass({
	getInitialState(){
		return{
			playlist: null
		}
	},
	componentDidMount(){
		$.ajax({
			url: '/api/playlists/'+this.props.params.playlistId,
			method: 'GET'
		})
		.done((data)=>
			this.setState({playlist: data})
			)
	},
	render(){
		console.log(this.state.playlist)
		return(
			this.state.playlist ? (
			<div>
			<h1>Playlist Title: {this.state.playlist.title}</h1>
			<h2>Songs:</h2>
			{this.state.playlist.songs.map((song, index)=>
				<div key={index}>
				<p>{song.title}</p>
					<iframe width="420" height="315"src={`${song.youtube_url.replace('watch?v=', 'embed/')}?origin=http://localhost:9999.com`}></iframe>
				</div>
				)}
			</div> ) : null
			)
	}
})

export default Playlist