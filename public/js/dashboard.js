var unirest = require("unirest");

var req = unirest("POST", "https://rapidapi.p.rapidapi.com/getPopularPhotos");

req.headers({
    "x-rapidapi-host": "PexelsdimasV1.p.rapidapi.com",
    "x-rapidapi-key": "24dd6eeab1msh040d1a938de7bcep17851djsn11e9c745b369",
    "useQueryString": true
});


req.end(function(res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
});