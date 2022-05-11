import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../register-view/register-view';
import { Menubar } from '../navbar/navbar';
import { Row, Col } from 'react-bootstrap/';
import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          user: null
        }
      }

      //Logic to be executed after loading page
      componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

      /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }
      
      onLoggedOut() {
        console.log('Token: ' + localStorage.getItem('token'));
        console.log('User: ' + localStorage.getItem('user'));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }
      
      getMovies(token) {
        axios.get('https://my-flix-cf.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      render() {
        const { movies, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                
        return (
           <BrowserRouter>
			  
			  <Menubar user={user} />
              
			  <Row className="main-view justify-content-md-evenly m-0 p-5 align-items-center">
			  			  
			  <Routes>
					
					<Route exact path="/" render={() => {
							
							if (!user) return 
							<Col>
								<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
							</Col>

					        if (movies.length === 0) return <div className="main-view" />;

							return movies.map(m => (
							<Col md={3} key={m._id}>
								<MovieCard movie={m} />
							</Col>
							))
					}} />
					
					<Route path="/register" render={() => {
						if (user) return <Redirect to='/' />
						return <Col lg={8} md={8}>
								<RegisterView />
							</Col>
					}} />

					<Route path="/movies/:id" render={({ match, history }) => {
						return <Col md={8}>
							<MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
						</Col>
					}} />
					
					
					</Routes>

				</Row>

          </BrowserRouter> 
		)}
    }

    
