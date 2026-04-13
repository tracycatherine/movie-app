# Overview

I am building a full-stack movie web application that allows users to search for movies, save them to a personal watchlist, and manage their favorites. The system connects a Node.js backend with a cloud database to store and retrieve user data efficiently.

The application integrates with a cloud database using Firebase Firestore. This allows real-time storage and retrieval of movie watchlist data such as title, year, and favorite status. Users can perform full CRUD operations (Create, Read, Update, Delete) on their watchlist.

To use the program, the user starts the backend server and accesses API endpoints such as `/search` to find movies using the OMDb API and `/watchlist` to manage saved movies. Data is stored remotely in Firebase, making it accessible from anywhere.

The purpose of this project is to strengthen my understanding of backend development, REST APIs, and cloud database integration while building a practical real-world application.

[Software Demo Video](https://youtube.link.goes.here)

---

# Cloud Database

The cloud database used in this project is Google Firebase Firestore.

Firestore is a NoSQL cloud database that stores data in collections and documents. It provides real-time syncing and easy integration with Node.js applications.

The database structure includes a collection called `watchlist`, where each document represents a movie. Each movie document contains:
- title (string)
- year (string)
- favorite (boolean, optional)

This structure allows easy CRUD operations from the backend API.

---

# Development Environment

The software was developed using Visual Studio Code as the main code editor. Node.js and Express.js were used to build the backend server. Firebase Admin SDK was used to connect to the Firestore cloud database.

The programming language used is JavaScript (Node.js runtime). The project also uses Axios for making HTTP requests to the OMDb API.

Main libraries used:
- Express.js
- Axios
- Firebase Admin SDK
- Node.js

---

# Useful Websites

- https://www.firebase.google.com/
- https://www.omdbapi.com/
- https://expressjs.com/
- https://nodejs.org/

---

# Future Work

- Improve frontend UI using React or a modern framework
- Add user authentication and login system
- Improve error handling and input validation
- Deploy the backend to a cloud hosting service
- Add movie ratings and review features