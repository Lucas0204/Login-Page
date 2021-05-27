# Login Page

## Is a simple login system that i maked to pratice

## - Important

- *If you see any bug, error or have a suggestion or tip, please leave a comment or pull request, it will help me a lot and i would be very grateful.*

## - About this project

- The organization of the folders was divided into model, view, controller and a route file. As this project was developed both back-end and front-end, the static files were kept in the public folder, such as images, styles and scripts.

- The back-end of this application was made with NodeJs, using the express framework for the server and MongoDb for the database. I also used npm's bcrypt package to encrypt user passwords, and ejs as a template engine.

- In this system, only those who are logged in can access the main page. I did this using JWT (JsonWebToken), to generate a token for the user, who after being logged in will be redirected to the main page with that token.

