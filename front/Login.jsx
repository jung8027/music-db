import React from 'react';
import $ from 'jquery'

const Login = React.createClass({
	getInitialState(){
		return{
			user: '', email: '', password: ''
		}
	},
	handelChange(eventType, event){
		this.setState({ [eventType]: event.target.value })
	},
	handelClick(){
		$.ajax({
			url: '/login',
			type: 'POST',
			data: {
				user: this.state.user,
				email: this.state.email,
				password: this.state.password
			}
		})
		.then(console.log(this.state))
	},
	render(){
		console.log(this.state)
		return(
			<div>
			<input type='text' placeholder='User Name' onChange={this.handelChange.bind(this, 'user')}/>
			<input type='text' placeholder='email'  onChange={this.handelChange.bind(this, 'email')}/>
			<input type='text' placeholder='password'  onChange={this.handelChange.bind(this, 'password')}/>
			<input type='submit' placeholder='Log-In' onClick={this.handelClick}/>
			</div>
		)
	}
})

export default Login