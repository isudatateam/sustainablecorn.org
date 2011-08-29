// JavaScript Document
function initSlideShow() {
	$('#slide_holder').cycle({fx: 'fade', speed:1000, timeout:4000, next: '#next', prev: '#prev'});
	$('#play_control').toggle(function(){
		$(this).toggleClass('pause');
		$('#slide_holder').cycle('pause');
	},function(){
		$(this).toggleClass('pause');
		$('#slide_holder').cycle('resume');
	});
}

function initDropDowns() {
	$('ul#top_nav_list').children('li').each(function(index){
		if ($(this).children('ul').length>0) {
			$(this).children('ul').attr('id','dd_'+index);
			var busy=0;
			$(this).hover(function(){
				if (busy==0) {
					busy=1;
					var slideTimer=setTimeout(function(){
						if (busy==1) {
							$('ul#dd_'+index).show('normal');
						}
					}, 250);
				}
			},function(){
				if (busy==1) {
					$('ul#dd_'+index).hide("fast", function(){busy=0;});
				}
			});
		}
	});
}
$(function(){
	initSlideShow();
	initDropDowns();
});



// pictureName =id, imageFile=src, getElementById= getId