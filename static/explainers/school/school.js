$(document).ready(function(){
	window.jQuery(document).on('step', function(e, theStep){
		$('.step').removeClass('active');
		$('.' + theStep).addClass('active');
	});
});