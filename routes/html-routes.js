// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");
const db = require("../models")
const axios = require("axios");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    app.get("/", (req, res) => {
        // if (req.user) {

        //     res.redirect("/my_closet");
        // } else {
            res.render("index", { stylesheet: "homepage" });
        // }
    });

    app.get("/login", (req, res) => {
        res.render("login", { stylesheet: "login_signup", js: "login" });
        // if (req.user) {
        //     res.redirect("/members");
        // }
        // res.sendFile(path.join(__dirname, "./views/login.handlebars"));

    });

    app.get("/signup", (req, res) => {
        res.render("signup", { stylesheet: "login_signup", js: "signup" });
    });

    app.get("/about", (req, res) => {
        res.render("about", { stylesheet: "about" });
    });

    //make sure to add isAuthenticated
    app.get("/my_closet", isAuthenticated, (req, res) => {

        // console.log(req.user);
        if (req.user != false) {

            db.Image.findAll({
                where: {
                    UserId: req.user.id || 1 // IMPORTANT: this value may be taken during isAuthenticated or save in a welcome h1 tag
                },
                include: [db.Comment]
            })
                .then(function (dbImage) {

                    // Array with photo URLs to send to Browser
                    const photos = dbImage.map((photo) => {

                        if (!photo.dataValues.Comments[0]) {
                            console.log(photo.dataValues.Comments[0]);

                            return {
                                imageURL: photo.dataValues.imageURL,
                                public_id: photo.dataValues.public_id,
                                id: photo.dataValues.id,
                                note: "",
                                "note-id": ""
                            }
                        } else {
                            console.log(photo.dataValues.Comments[0].dataValues.id);
                            return {
                                imageURL: photo.dataValues.imageURL,
                                public_id: photo.dataValues.public_id,
                                id: photo.dataValues.id,
                                note: photo.dataValues.Comments[0].dataValues.content,
                                "note-id": photo.dataValues.Comments[0].dataValues.id
                            }
                        }
                    });

                    // console.log(photos);

                    res.render("my_closet", { stylesheet: "my_closet", photos: photos, sidenav: true, js1: "sidebar", js: "my_closet" });
                })
        } else {
            res.redirect("/login")
        }
    });

    //make sure to add isAuthenticated
    app.get("/window_shop", isAuthenticated, (req, res) => {

        //Our PEXELS API code. We pull images from here
        let keyword = "fashion";
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
                // console.log(nextPage);


                // Array with photo URLs to send to Browser
                const photos = respond.data.photos.map((photo) => {
                    return {
                        imageURL: photo.src.large,
                        public_id: photo.id
                    };


                });
                // To send to Browser
                // console.log(photos);

                res.render("window_shop", { stylesheet: "window_shop", photos: photos, sidenav: true, js: "sidebar", js: "w_shop" });

            });

    });

    //make sure to add isAuthenticated
    app.get("/window_shop/:gender/:category", isAuthenticated, (req, res) => {

        //Our PEXELS API code. We pull images from here
        let keyword = req.params.gender + " " + req.params.category;
        // let keyword = req.search.keyword  //"fashion"
        const baseURL = "https://api.pexels.com/v1/search?query=" + keyword + "&per_page=75&page=1";
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
                // console.log(nextPage);


                // Array with photo URLs to send to Browser
                const photos = respond.data.photos.map((photo) => {
                    return {
                        imageURL: photo.src.large,
                        public_id: photo.id
                    };


                });
                // To send to Browser
                // console.log(photos);

                res.render("window_shop", { stylesheet: "window_shop", photos: photos, sidenav: true, js: "sidebar", js: "w_shop" });

            });

    });
};