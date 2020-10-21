$(".remove-from-closet").on("click", function () {
    console.log("here");
    const imageTag = $(this).parent().find("img");

    $.ajax({
        method: "DELETE",
        url: "/api/images",
        dataType: 'json',
        data: {
            imageURL: imageTag.attr("src"),
            public_id: imageTag.data("id"),
            // UserId: data.id // Uncomment to work with logged in user id
            UserId: $("#welcome").data("user-id") // Delete line to work with logged in user id
        }
    })
        .then(function (response) {
            console.log(response);
            window.location.replace("/my_closet");
        })
        .catch(err => {
            console.log(err);
        });
});

$(".add-note").on("click", function () {
    console.log("saving note...");

});