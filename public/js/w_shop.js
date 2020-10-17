// Post to /api/explorer 
$("button").on("click", function(){
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