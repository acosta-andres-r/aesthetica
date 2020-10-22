// Requiring our models and passport as we've configured it
const db = require("../models");
const axios = require("axios");
// const passport = require("../config/passport");


module.exports = function (app) {

  // Post route to GET the 20 image URLs from PEXEL
  app.post("/api/explorer", function (req, res) {

    // req.search.keyword // ---> Request in this format
    console.log(req.body.search);

    //Our PEXELS API code. We pull images from here. 
    let keyword = req.body.search
    // let keyword = req.search.keyword  //"fashion"
    const baseURL = "https://api.pexels.com/v1/search?query=" + keyword + "&per_page=20&page=1";
    axios
      .get(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.API_KEY
        }
      })
      .then(function (respond) {


        //Next page 
        nextPage = respond.data.next_page;
        console.log(nextPage);


        // Array with photo URLs to send to Browser
        photos = respond.data.photos.map((photo) => {
          return {
            imageURL: photo.src.medium,
            public_id: photo.id
          };


        });
        // To send to Browser
        console.log(photos);

        res.json({
          photos: photos
        });
      });
  });


  // POST route for saving a new image
  app.post("/api/images", function (req, res) {

    const imageToSave = {
      imageURL: req.body.imageURL,
      public_id: req.body.public_id,
      UserId: req.body.UserId // IMPORTANT: this value may be taken during isAuthenticated or save in a welcome h1 tag
    }

    // Find out if image already exist for the user
    db.Image
      .count({ where: imageToSave })
      .then(function (count) {

        if (count === 0) {
          // Save image if not exist

          console.log(imageToSave);

          db.Image
            .create(imageToSave)
            .then(function (dbImage) {

              console.log(dbImage);
              res.json(dbImage);
            });
        } else {
          res.json();
        }
      })
  });

  // // DELETE route is in my_closet.js
}