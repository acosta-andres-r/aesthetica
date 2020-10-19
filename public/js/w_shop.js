// Post to retrieve Pexel image URLs
$("#explore").on("click", function () {
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

// Post to save an image
$("#favorite").on("click", function () {

  $.post("/api/images", {
    imageURL: "https://images.pexels.com/photos/3317434/pexels-photo-3317434.jpeg?auto=compress&cs=tinysrgb&h=350",
    public_id: "3317434",
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

// Post to delete an image 
$("#unfavorite").on("click", function () {

  $.ajax({
    method: "DELETE",
    url: "/api/images/",
    dataType: 'json',
    data: {
      public_id: "3317434",
      UserId: $("#welcome").data("user-id")
    }
  })
    .then(function (response) {
      console.log(response);
    });
})

$("#logout").on("click", function () {
  $.get("/logout")
    .then(() => {
      window.location.replace("/");
      // If there's an error, log the error
    })
    .catch(err => {
      console.log(err);
    });
});
