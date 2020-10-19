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

// function womenApparel() {



//     var clickAllWomen = $("#womenAll").on("click", function() {})
//     var clickTops = $("Tops").on("click", function() {})
//     var clickPants = $("Pants").on("click", function() {});
//     var clickDresses = $("Dresses").on("click", function() {});
//     var clickSkirts = $("Skirts").on("click", function() {});
//     var clickCoats = $("Coats").on("click", function() {});
//     var clickJackets = $("Jackets").on("click", function() {});
//     var clickSporty = $("Sporty").on("click", function() {});
//     var clickSwim = $("Bottoms").on("click", function() {});
//     var clickLingerie = $("Lingerie").on("click", function() {});
//     var Accessories = $("Accessories").on("click", function() {});
//     var clickShoes = $("Shoes").on("click", function() {});

//     womenApparel()






// Post to save an image
// $("#favorite").on("click", function(){

//     $.post("/api/images", {
//       imageURL: "https://images.pexels.com/photos/3317434/pexels-photo-3317434.jpeg?auto=compress&cs=tinysrgb&h=350",
//       public_id: "3317434",
//       UserId: $("#welcome").data("user-id")
//     })
//         .then((res) => {
//           console.log(res);
//           // If there's an error, log the error
//         })
//         .catch(err => {
//           console.log(err);
//         });
// })

// Post to delete an image 
// $("#unfavorite").on("click", function(){

//   $.ajax({
//     method: "DELETE",
//     url: "/api/images/",
//     dataType: 'json',
//     data: {
//       public_id: "3317434",
//       UserId: $("#welcome").data("user-id")
//     }
//   })
//     .then(function(response) {
//       console.log(response);
//     });
// })