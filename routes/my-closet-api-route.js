// Requiring our models and passport as we've configured it
const db = require("../models");
// const passport = require("../config/passport");


module.exports = function (app) {

  // Get route to grab all the saved images
  app.get("/api/images", function (req, res) {

    // db.Image.findAll({
    //   where: {
    //     UserId: req.body.UserId // IMPORTANT: this value may be taken during isAuthenticated or save in a welcome h1 tag
    //   }
    // })
    //   .then(function (dbImage) {
    //     console.log(dbImage);
    //     res.json(dbImage);
    //   })
  });

  // DELETE route for deleting images if user unfavorite the image
  app.delete("/api/images", function (req, res) {

    const imageToDelete = {
      imageURL: req.body.imageURL,
      public_id: req.body.public_id,
      UserId: req.body.UserId // IMPORTANT: this value may be taken during isAuthenticated or save in a welcome h1 tag
    }

    db.Image
      .count({ where: imageToDelete })
      .then(function (count) {

        if (count != 0) {
          // Delete image if not exist
          db.Image.destroy({
            where: imageToDelete
          }).then(function (dbImage) {
            res.json(dbImage);
            res.redirect("/my_closet");
          });

        } else {
          res.json();
        }
      })

  });
}