// 1 create array of string and store it in var topics
// create a loop to go over array and create a buttons in HTML

$(function() {
  var topics = ["Deer", "Donkey", "Dog", "Duck", "Dolphin"];

  function addTheButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var animalButton = $("<button>");
      animalButton.attr("value", topics[i]);
      animalButton.addClass("show");
      animalButton.text(topics[i]);
      $("#buttons-view").append(animalButton);
    }
  }

  addTheButtons();

  $("#buttons-view").on("click", ".show", function() {
    var animal = $(this).attr("value");
    console.log("this is a value" + animal);
    // connecting giphy
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=pNhzgpc07zmzmPylnM1cWj1ZwCwjYgL3&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animalPicture = $("<img>");
        animalPicture.attr("src", results[i].images.fixed_height_still.url);
        animalPicture.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        animalPicture.attr("data-state", "still");
        animalPicture.addClass("gif");
        animalPicture.attr("data-animate", results[i].images.fixed_height.url);
        gifDiv.prepend(p);
        gifDiv.prepend(animalPicture);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });



    $(document).on("click", ".gif", function() {
      var state = $(this).attr("data-state");
      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    });



    $("#add-animal").on("click", function() {
      event.preventDefault();
      var addedByUser = $("#animal-input").val().trim();
      topics.push(addedByUser);
      addTheButtons();
      return;
      // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + addedByUser + "&api_key=pNhzgpc07zmzmPylnM1cWj1ZwCwjYgL3&limit=10";
    });
  });
});
