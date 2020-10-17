// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
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

  //make sure to add isAuthenticated
  app.get("/my_closet", (req, res) => {
    res.render("my_closet", { sidenav: true, js: "sidebar" });
  });

  //make sure to add isAuthenticated
  app.get("/window_shop", (req, res) => {
    res.render("window_shop", { sidenav: true, js: "sidebar", wshop: true });
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
