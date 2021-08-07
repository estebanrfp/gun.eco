$(document).ready(function(){
	var $blackScreen = $('.black_screen');

	$('.play_btn').hover(function(){
		$('.hollow').fadeToggle();
		$('.full').fadeToggle();
	});

	$('.play_btn').click(function(){
		$blackScreen.fadeIn();
		var vid = $('.iframeVid').clone(true,true);
		vid.show().appendTo($('.iframeVid').parent());
		vid.attr('id', 'iframeVid').attr('src', 'https://www.youtube.com/embed/qKIn9L2obug?enablejsapi=1&rel=0&autoplay=1');
	});

	$('.close').click(function(){
		$blackScreen.fadeOut();
		$('#iframeVid').remove();
		// onPlayerStateChange();
	});
});