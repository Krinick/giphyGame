$(document).ready(function () {

    $("#addBtn").on('click', function (event) {
        event.preventDefault();

        var btnName = $("#btnName").val().trim();
        console.log(btnName);
        createNewBtn(btnName);
    });

    // Event listener for all button elements
    $(document).on("click", function (event) {
        event.preventDefault();
        var btnClicked = $(event.target);
        if ($(btnClicked).attr("data-person")) {
            var person = $(btnClicked).attr("data-person");
            searchGiphy(person);
        };
        // In this case, the "this" keyword refers to the button that was clicked

    });

    function createNewBtn(btnTitle) {
        var newBtn = $("<button>");
        newBtn.attr('data-person', btnTitle);
        newBtn.text(btnTitle);
        newBtn.addClass('gif');
        $("#searchButtons").append(newBtn);
    };

    function searchGiphy(searchParam) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchParam + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div for the gif
                        var gifDiv = $("<div>");
                        // Storing the result item's rating
                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                        // Creating an image tag
                        var personImage = $("<img>");
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        personImage.attr("src", results[i].images.fixed_height.url);
                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);
                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                }
            });
    }


})
