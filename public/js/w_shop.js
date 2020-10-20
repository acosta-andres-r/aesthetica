// Post to retrieve  images from Pexel image URLs
//Explore button to retrieve all images under the keyword: fashion
$("#explore").on("click", function() {
    $.post("/api/explorer", {
            search: "fashion"
        })
        .then((res) => {
            console.log(res);
            // If there's an error, log the error
        })
        .catch(err => {
            console.log(err);
        });
})

// //Buttons for women's apparel searches :
$(".women").on("click", function() {
    var userClick = "women's" + " " + $(this).attr('id')
    console.log("click")
    console.log(userClick)
    $.post("/api/explorer", {
            search: userClick
        })
        .then((res) => {
            console.log(res);
            // If there's an error, log the error
        })
        .catch(err => {
            console.log(err);
        });
})

$(".men").on("click", function() {
        var userClick = "men's" + " " + $(this).attr('id')
        console.log("click")
        console.log(userClick)
        $.post("/api/explorer", {
                search: userClick
            })
            .then((res) => {
                console.log(res);
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    })
    // Post to save an image
$(".add-to-closet").on("click", function() {

    const imageTag = $(this).parent().find("img");

    $.post("/api/images", {
            imageURL: imageTag.attr("src"),
            public_id: imageTag.data("id"),
            UserId: $("#welcome").data("user-id")
        })
        .then((res) => {
            console.log(res);
            // If there's an error, log the error
        })
        .catch(err => {
            console.log(err);
        });
})

$("#unfavorite").on("click", function() {

    $.ajax({
            method: "DELETE",
            url: "/api/images/",
            dataType: 'json',
            data: {
                public_id: "3317434",
                UserId: $("#welcome").data("user-id")
            }
        })
        .then(function(response) {
            console.log(response);
        });
})

$("#logout").on("click", function() {
    $.get("/logout")
        .then(() => {
            window.location.replace("/");
            // If there's an error, log the error
        })
        .catch(err => {
            console.log(err);
        });
});