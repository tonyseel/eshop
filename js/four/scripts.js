function parallax() {
	var scrollPosition = $(window).scrollTop();
	$('#parallax').css('top',(0 - (scrollPosition * 0.3))+'px' ); // bg image moves at 30% of scrolling speed
	//$('#hero').css('opacity',((100 - scrollPosition/2) *0.01));
}
$(document).ready(function() {

	/*	Parallax Background
	================================================== */

	$(window).on('scroll', function(e) {
		parallax();
	});
	
	/*	Local Scroll
	================================================== */
	
	jQuery('.navbar').localScroll({
			offset: -80,
			duration: 500
		});
		
	/*	Active Menu
	================================================== */
		
	jQuery(function() {
		var sections = jQuery('section');
		var navigation_links = jQuery('nav a');
		sections.waypoint({
		handler: function(direction) {
			var active_section;
			active_section = jQuery(this);
			if (direction === "up") active_section = active_section.prev();
			var active_link = jQuery('nav a[href="#' + active_section.attr("id") + '"]');
			navigation_links.parent().removeClass("active");
			active_link.parent().addClass("active");
			active_section.addClass("active-section");
		},
		offset: '35%'
		});
	});
	
	/*	Animation with Waypoints
	================================================== */
	
	jQuery('.animate').waypoint(function() {
	     var animation = jQuery(this).attr("data-animate");
	     jQuery(this).addClass(animation);
	     jQuery(this).addClass('animated');
	}, { offset: '80%' });
	
	/*	Pretty Photo
	================================================== */
	
	jQuery('#gallery a').attr('rel', 'prettyPhoto');
	jQuery("a[rel^='prettyPhoto']").prettyPhoto();
	
	/*	Bootstrap Carousel
	================================================== */
	
	jQuery('.carousel').carousel()
	

});



// IE7 A jQuery based placeholder polyfill
$(document).ready(function(){
  function add() {
    if($(this).val() === ''){
      $(this).val($(this).attr('placeholder')).addClass('placeholder');
    }
  }

  function remove() {
    if($(this).val() === $(this).attr('placeholder')){
      $(this).val('').removeClass('placeholder');
    }
  }

  // Create a dummy element for feature detection
  if (!('placeholder' in $('<input>')[0])) {

    // Select the elements that have a placeholder attribute
    $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

    // Remove the placeholder text before the form is submitted
    $('form').submit(function(){
      $(this).find('input[placeholder], textarea[placeholder]').each(remove);
    });
  }
});
