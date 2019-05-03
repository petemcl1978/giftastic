//giftastic 
var topics = ["big lebowski","The Simpsons","Back To the Future","Tron","Fever Pitch","The Quiet Man"];

    var button;
    var newTopic = ""; //new topic that will be added via the input field

    //function to create new buttons from the topic array

    var buttonGenerator = function(){
        //the previous div elements are emptied
        $("#buttonArea").empty();
        //loops through the array and creates buttons
            for(i = 0; i <topics.length; i++) {
                button = $("<button type=" + "button" + ">" + topics[i] + " </button").addClass("btn btn-warning").attr("data",topics[i]);
                $("#buttonArea").append(button);
            };
            }
    

            //the user clicks on a generated orange button, which generates 10 static,non animated gif images from the GIPPHY API and places them on the page

            $("#buttonArea").on("click", ".btn", function(){
                var thing = $(this).attr("data");
                var queryURL =
                 "https://api.giphy.com/v1/gifs/search?api_key=BZP8gZt1cDB38GxXRpGaKbo2O2RKZHUQ&q=&limit=10&offset=0&rating=G&lang=en";

                 $(".instructions").show();

                 $.ajax({
                     url: queryURL,
                     method: "GET"
                    
                    }).done(function(response){
                        //console.log(response);

                        var results = response.data;

                        for (var i = 0; i < results.length; i++) {
                            //a div is greated to hold a gif of any topic

                            var topicDiv =$("<div>");

                            //under every gif,display rating 
                            var p = $("<p>");
                            p.text(results[i].rating);
                            var p = $("<p>").text("Rating:" + results[i].rating);
                            //add a css style to create colored borders around the gifs. 
                            var topicImage = $("<img>").addClass("orangeBorder");

                                //add states of animate and still which will be toggled

                                topicImage.attr("src", results[i]. images.fixed_height_still/irl);

                                topicImage.attr("data-still",results[i].images.fixed_height_still.url);

                                topicImage.attr("data-animate", results[i].images.fixed_height.url)
                                topicImage.attr("data-state", "still")

                                topicImage.addClass("gif");

                                //image is appended to the div

                                topicDiv.append(topicImage);
                                //rating is appended to the div below the gif

                                topicDiv.append(p);
                                //new images will be placed at the begining (yop) of the containing gif area

                                $("#gifArea").prepend(topicDiv);
                        }
                    })
            })

            //when the user click on one of the still GIPHY images, and it animates. when the user clicks the gif again it stops playing 
            $("#gifArea").on("click", ".gif", function(event){
                event.preventDefault();

                //gets the current state of the click gif

                var state = $(this).attr("data-state");

                //according to the current state gifs togle between animate and still 
                 if (state === "still") {
                     $(this).attr("src",$(this).attr("data-animate"));
                     $(this).attr("data-state","animate");
                 } else {
                     $(this).attr("src",$(this).attr("data-still"));
                     $(this).attr("data-state", "still");
                 }
                 
            })

            //this form takes the value from the imput and adds it into the topics array. the buttonGenerator function is called that takes each topic in the array remakes the buttons on the page. 
            
            $(".submit").on("click", function(event){
                event.preventDefault();
                //console.log("submit");
                //set inputted value to newTopic
                newTopic = $("#topic-input").val();
            //new topic is added 
        topics.push(newTopic);
            //console.log(topics);
        //call the function that creates the new button 
        buttonGenerator();
        });

        buttonGenerator();

            