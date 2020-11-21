$(".remove-from-closet").on("click", function () {

    const imageTag = $(this).parent().find("img");

    const textArea = $(this).parent().find("textarea");
    
    // console.log("here 1");
    // console.log(textArea.data("note-id"));
    
    if (textArea.data("note-id")) {

        $.ajax({
            method: "DELETE",
            url: "/api/comments",
            dataType: 'json',
            data: {
                commentId: textArea.data("note-id")
            }
        })
            .then(function (response) {

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
                        // console.log(response);
                        window.location.replace("/my_closet");
                    })
                    .catch(err => {
                        console.log(err);
                    });

            })
            .catch(err => {
                // console.log("here");
                console.log(err);
            });

    } else {

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
                // console.log(response);
                window.location.replace("/my_closet");
            })
            .catch(err => {
                console.log(err);
            });
    }

});

$(".add-note").on("click", function () {
    // console.log("saving note...");

    const textArea = $(this).parent().find("textarea");
    const imageTag = $(this).parent().find("img");

    if (!textArea.data("note-id")) {
        // Add new note to db
        $.post("/api/comments", {
            content: textArea.val(),
            ImageId: imageTag.data("image-id"),
            UserId: 1
        })
            .then((res) => {
                // console.log(res);
                window.location.replace("/my_closet");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        // Update note in db
        $.ajax({
            method: "PUT",
            url: "/api/comments",
            // dataType: 'json',
            data: {
                content: textArea.val(),
                // ImageId: imageTag.data("image-id"),
                id: textArea.data("note-id")
            }
        })
            .then((res) => {
                // console.log(res);
                window.location.replace("/my_closet");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }


});

$(".delete-note").on("click", function () {

    const textArea = $(this).parent().find("textarea");

    $.ajax({
        method: "DELETE",
        url: "/api/comments",
        dataType: 'json',
        data: {
            commentId: textArea.data("note-id")
        }
    })
        .then(function (response) {
            // console.log(response);
            window.location.replace("/my_closet");
        })
        .catch(err => {
            console.log(err);
        });
});