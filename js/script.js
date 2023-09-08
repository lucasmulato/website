/*
Author       : Abubakar Siddique
Template Name: Prince - Personal CV/Resume Template
Version      : 1.0
*/
(function($)
{
	"use strict";
	
	//========================= preloader ================
	$(window).on('load', function() {
		preloader();
	})
	
	//JQuery for page scrolling feature - requires JQuery Easing plugin
	$(document).on('ready', function () {
		Boxlayout.init();	
	});
	
	// Video player
	$('.player').mb_YTPlayer();
	
	//============= Preload ============ 
	function preloader(){
		$(".preloaderimg").fadeOut();
		$(".preloader").delay(200).fadeOut("slow").delay(200, function(){
			$(this).remove();
		});
	}
		
})(jQuery);	


	
