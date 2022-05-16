import React, {useState, useEffect} from 'react';
import axios from 'axios';


import { Navbar } from '../layout/navbar';
import { Row, Col, Container } from 'react-bootstrap/';
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Link,
  Outlet,
  useParams,
  Redirect,
  useNavigate
} from "react-router-dom";

export function SharedLayout()  {
 

  // const [user, setUser] = useState(props.user);
  // const [movies, setMovies] = useState(props.movie)
  // const navigate = useNavigate();

  //     /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  //     function onLoggedIn(authData) {
  //       console.log("OnLoggedIn...");
  //       console.log(authData);
  //       setUser(authData.user.Username)
        
  //       localStorage.setItem('token', authData.token);
  //       localStorage.setItem('user', authData.user.Username);
  //       //getMovies(authData.token);
        
  //       // navigate("./movies");
  //     }
      
  //     function onLoggedOut() {
  //       console.log('Token: ' + localStorage.getItem('token'));
  //       console.log('User: ' + localStorage.getItem('user'));
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
  //       setUser(null)
  //     }

  //     //fetch movies from API
  //   function getMovies(token) {
  //     console.log('getMovies');
  //       axios.get('https://my-flix-cf.herokuapp.com/movies', {
  //         //headers: { Authorization: `Bearer ${token}`}
  //       })
  //       .then(response => {
  //         // Assign the result to the state
  //         console.log('Setting Movies: '+response.data);
  //         setMovies(response.data)
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //     }


  //     useEffect(() => {
  //       // if (selectedMovie) return <MovieView movie={selectedMovie} />;
  //       getMovies(true);
  //      },[])
      
      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
            
      return (
        <> 
                  
                  <Navbar />
                  <Outlet />
         </>
            
      //       <Container>
      //         	<Menubar user={user} />
                    
      //         					<Routes>
      //                         <Route path="/" element={<LoginView onLoggedIn = {onLoggedIn} />}/>
      //                         <Route path="/movies" element={<MovieList user={user} movies={movies} />}>
      //                             <Route path="/movies/:movieId" element={<MovieView />}/>
                                            
      //                                 {/* <Route path="/" element={} />
      //                                 <Route path="/" element={} />
      //                                 <Route path="/" element={} /> */}
      //                         </Route>         
      //                   </Routes>

      //  </Container>


					/* <Routes>
						<Route path="/" render={() => {
                              			if (!{user}) return 
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
                                
                        
                        <Route path="/movies/:id" render={({ match, history }) => {
                  		                return <Col md={8}>
                  			              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  		                </Col>
                                    	}} />
                        <Route path="/register" render={(user) => {
                                        if ({user}) return <Redirect to='/login' />
                                        return <Col lg={8} md={8}>
                                            <RegistrationView />
                                          </Col>
                                      }} />
                  	</Routes>                            */
                      
      )
    
    }
    