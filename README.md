This project was built as part of CareerFoundry's Full-Stack-Web-Development course.
It features a MERN stack and has been updated to React 18+ version.

The REST API for the app (JavaScript, Node.js, Express, MongoDB) has previously been developed and is currently hosted on Heroku. Details can be found [here](https://github.com/toNy5oo/movie_api). 

---

The REST API can be accessed via commonly used HTTP methods (GET, POST, PUT, DELETE). CRUD operations allow the Frontend app to retrieve data from the database.


Server-side CRUD operations:

    Allows users to see a list of all movies in the database
    Allows users to get detailed information about a single movie by movie title
    Allows users to get detailed information about a genre by genre name
    Allows users to get detailed information about a director by name
    Allows new users to create an user account
    Allows existing users to update their user info or to delete their account
    Allows existing users to add or remove movies to/from their list of favorites

Dependencies

    bcrypt
    body-parser
    cors
    express
    express-validator
    jsonwebtoken
    mongoose
    morgan
    passport
    passport-jwt
    passport-local
    uuid

A list of all the endpoints as their details can be found [here](https://tony5oo.github.io/movie_api/public/documentation.html)

---

The UI of myFlix is built using the React library and React Bootstrap. The interface views will handle data requested by the user through the REST API endpoints of the backend.

Technical Details

Application features:

    is a single-page application
    uses state routing to navigate between views and share URLs
    gives users option to filter movies
    gives users option to sort movies
    initially uses Parcel as its built tool
    is migrated to create-react-app
    is written using React library and ES2015+
    is written with React Redux
    uses Bootstrap as a UI library for styling and responsiveness
    contains a mix of class components and function components
    is hosted online on Github Pages

Essential Views and Features
Main view

    returns a list of all movies to the user (each listed item with image, title, description)
    sorting and filtering
    ability to select a movie for more details
    provides links/buttons to see profile data and to log out

Movie view

    returns data (description, genre, director, image) about a single movie to the user
    allows users to add a movie to their list of favorites

Login view

    allows users to login with username and password
    provides a link for new users registration view

Registration view

    allows new users to sign in (username, password, email, birthday)

Genre view

    returns data about a genre (name, description)
    displays example movies

Director view

    returns data about a director (name, bio, birth year, death year if existing)
    displays example movies

Profile view

    allows users to see their profile data (username, email, birthday)

    displays favorite movies

    allows users to remove a movie from their list of favorites

    provides buttons to either update or delete existing account

Update profile

    allows users to update their user info
