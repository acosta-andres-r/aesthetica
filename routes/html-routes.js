// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");
const db = require("../models")
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/my_closet");
    }
    res.render("index", { stylesheet: "homepage" });
  });

  app.get("/login", (req, res) => {
    res.render("login", { stylesheet: "login_signup" });
  });

  app.get("/signup", (req, res) => {
    res.render("signup", { stylesheet: "login_signup", js: "signup" });
  });

  app.get("/about", (req, res) => {
    res.render("about", { stylesheet: "about" });
  });

  //make sure to add isAuthenticated
  app.get("/my_closet", (req, res) => {
    res.render("my_closet", { sidenav: true, js: "sidebar", stylesheet: "my_closet" });
  });

  //make sure to add isAuthenticated
  app.get("/window_shop", (req, res) => {
  
  //Our PEXELS API code. We pull images from here
    const axios = require("axios");
    let keyword = "fashion";
    // let keyword = req.search.keyword  //"fashion"
    const baseURL = "https://api.pexels.com/v1/search?query=" + keyword + "&per_page=20&page=1";
    axios
      .get(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: "563492ad6f9170000100000199d9e9a819a942398aa8d5dd20a55d0d"
        }
      })
      .then(function (respond) {


        //Next page 
        nextPage = respond.data.next_page;
        console.log(nextPage);


        // Array with photo URLs to send to Browser
        photos = respond.data.photos.map((photo) => {
          return {
            imageURL: photo.src.large,
            public_id: photo.id
          };


        });
        // To send to Browser
        console.log(photos);

        res.render("window_shop", {photos: photos, sidenav: true, js: "sidebar", js: "w_shop.js" });

      });

  });

  // app.get("/login", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // // Here we've add our isAuthenticated middleware to this route.
  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
};
