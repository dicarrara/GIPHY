// 1 create array of string and store it in var topics
// create a loop to go over array and create a buttons in HTML

$(function() {
  var topics = ["cat", "dog", "bird", "whale", "shark"];

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
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animalDiv = $("<div class='col-md-3'>");
        var animalAnimated = results[i].images.fixed_height.url;
        var animalStatic = results[i].images.fixed_height_still.url;
        var animalPicture = $("<img>");

        animalPicture.attr("src", animalStatic);
        animalPicture.attr("data-still", animalStatic);
        animalPicture.attr("data-state", "still");
        animalPicture.addClass("gif");
        animalPicture.attr("data-animate", animalAnimated);
        animalDiv.append(p);
        animalDiv.append(animalPicture);
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
  });

  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log("click works" + state);
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function() {
    event.preventDefault();
    var addedByUser = $("#animal-input")
      .val()
      .trim();
    topics.push(addedByUser);
    addTheButtons();
  });
});
