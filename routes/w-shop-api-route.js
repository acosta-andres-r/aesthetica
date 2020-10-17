// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");


module.exports = function (app) {

    app.post("/api/explorer", (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        // res.json({
        //     email: req.user.email,
        //     id: req.user.id
        // });

        // req.search.keyword // ---> Request in this format

        //Our PEXELS API code. We pull images from here. 
        const axios = require("axios");
        let keyword = "fashion"
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

                res.json({
                    photos: photosURL
                });
            });
    });

}