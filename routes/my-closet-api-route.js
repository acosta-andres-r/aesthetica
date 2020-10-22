// Requiring our models and passport as we've configured it
const db = require("../models");
// const passport = require("../config/passport");


module.exports = function (app) {

  // DELETE route for deleting images if user unfavorite the image
  app.delete("/api/images", function (req, res) {

    const imageToDelete = {
      imageURL: req.body.imageURL,
      public_id: req.body.public_id,
      UserId: req.user.id || req.body.UserId // IMPORTANT: this value may be taken during isAuthenticated or save in a welcome h1 tag
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
            // res.redirect("/my_closet");
          });

        } else {
          res.json();
        }
      })

  });


  // POST route for saving a comment
  app.post("/api/comments", function (req, res) {

    const commentToSave = {
      content: req.body.content,
      ImageId: req.body.ImageId,
      UserId: req.user.id || req.body.UserId // IMPORTANT: this value may be taken during isAuthenticated or save in a welcome h1 tag
    }

    db.Comment
      .create(commentToSave)
      .then(function (dbContent) {

        // console.log(dbContent);
        res.json(dbContent);
      });

  });

  // DELETE route for deleting images if user unfavorite the image
  app.delete("/api/comments", function (req, res) {

    const commentToDelete = {
      id: req.body.commentId
    }

    db.Comment
      .count({ where: commentToDelete })
      .then(function (count) {

        if (count != 0) {
          // Delete image if not exist
          db.Comment.destroy({
            where: commentToDelete
          }).then(function (dbContent) {
            res.json(dbContent);
            // res.redirect("/my_closet");
          });

        } else {
          res.json();
        }
      })

  });

  // PUT route for updating posts
  app.put("/api/comments", function (req, res) {

    console.log(req.body.content);

    const commentToUpdate = {
      content: req.body.content,
    }

    db.Comment
      .update(
        commentToUpdate,
        {
          where: {
            id: req.body.id 
          }
        }).then(function (dbComment) {
          res.json(dbComment);
        });
  });

}