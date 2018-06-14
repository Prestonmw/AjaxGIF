var gameTitle = ['Super Mario', 'Super Smash Bros.', 'Pokemon', 'Kirby', 'The Legend of Zelda', 'Fire Emblem', 'Metroid', 'Kingdom Hearts', 'The Elder Scrolls', 'Red Dead Redemption', 'Bayonetta'];
var currentGif; var pausedGif; var animatedGif; var stillGif;

//creates buttons
function createButtons(){
	$('#Buttons').empty();
	for(var i = 0; i < gameTitle.length; i++){
		var gameBtn = $('<button>').text(gameTitle[i]).addClass('gameBtn').attr({'data-name': gameTitle[i]});
		$('#Buttons').append(gameBtn);
	}

	
	$('.gameBtn').on('click', function(){
		$('.display').empty();

		var thisGame = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisGame + "&limit=10&api_key=02D6Tpp7ahc5v0pn9GGp0SPiwvthhc0A";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
	// 	});
	// });
}


$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });


$('#addGame').on('click', function(){
	var newGame = $('#newGameInput').val().trim();
	showTitle.push(newGame);
	createButtons();
	return false;
});

createButtons();