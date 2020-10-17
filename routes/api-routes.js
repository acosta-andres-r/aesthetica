// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });



  //Our PEXELS API code. We pull images from here. 
  const axios = require("axios");
  let keyword = "fashion"
  const baseURL = "https://api.pexels.com/v1/search?query=" + keyword + "&per_page=20&page=1";
  axios
    .get(baseURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: "563492ad6f9170000100000199d9e9a819a942398aa8d5dd20a55d0d"
      }
    })
    .then(function (res) {


      //Next page 
      nextPage = res.data.next_page;
      console.log(nextPage);


      // Array with photo URLs to send to Browser
      photosURL = res.data.photos.map((photo) => {
        return photo.src.medium;


      });
      // To send to Browser
      console.log(photosURL);
    });

}