$( document ).ready(function() {
	
	var games = ["Super Mario", "Super Smash Bros.", "The Legend of Zelda", "Pokemon", "Kingdom Hearts", "Kirby", "The Elder Scrolls", "Splatoon", "Metroid", "Mortal Kombat"];

	function displayGifButtons(){
		$("#gifButtonsView").empty(); 
		for (var i = 0; i < games.length; i++){
			var gifButton = $("<button>");
			gifButton.addClass("game");
			gifButton.addClass("btn btn-primary")
			gifButton.attr("data-name", games[i]);
			gifButton.text(games[i]);
			$("#gifButtonsView").append(gifButton);
		}
	}
	
	function addNewButton(){
		$("#addGif").on("click", function(){
		var game = $("#game-input").val().trim();
		if (game == ""){
		  return false; 
		}
		games.push(game);
	
		displayGifButtons();
		return false;
		});
	}
	
	function removeLastButton(){
		$("removeGif").on("click", function(){
		games.pop(game);
		displayGifButtons();
		return false;
		});
	}
	
	function displayGifs(){
		var game = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=02D6Tpp7ahc5v0pn9GGp0SPiwvthhc0A";
		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			console.log(response); 
			$("#gifsView").empty();
			var results = response.data;
			if (results == ""){
			  alert("What's that?");
			}
			for (var i=0; i<results.length; i++){
	
				var gifDiv = $("<div>"); 
				gifDiv.addClass("gifDiv");
				
				var gifRating = $("<p>").text("Rating: " + results[i].rating);
				gifDiv.append(gifRating);
				
				var gifImage = $("<img>");
				gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
				gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
				gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
				gifImage.attr("data-state", "still"); 
				gifImage.addClass("image");
				gifDiv.append(gifImage);
				
				$("#gifsView").prepend(gifDiv);
			}
		});
	}

	displayGifButtons();
	addNewButton();
	removeLastButton();
	
	$(document).on("click", ".game", displayGifs);
	$(document).on("click", ".image", function(){
		var state = $(this).attr('data-state');
		if ( state == 'still'){
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		}else{
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	});
	});