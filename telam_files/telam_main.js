;(function(){

	function main() {

		var mobileWidth = 700,
			$bxSlider = $('.bxslider'),
			widthSize = $( window ).width();
		

		 	$bxSlider.bxSlider({
				minSlides: 1,
				maxSlides: 3,
				infiniteLoop: false,
				pager: false,
				speed: 500,
				slideWidth: 323,
				slideMargin: 1
			});
		 
		$('.gallery-mod').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			infiniteLoop: false,
			pager: false,
			speed: 500,
			captions: true,
			options: 'fade',
			slideWidth: 966
		});	

		$('.slider-radio').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			infiniteLoop: true,
			auto: true,
			pager: true,
			speed: 300,
			slideWidth: 970
		});	

		$('.suple-module').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			infiniteLoop: true,
			auto: true, 
			speed: 300,
			pause: 10000,
			slideWidth: 298,
			buildPager: function(slideIndex){
			    switch(slideIndex){
			      case 0:
			        return 'Reporte';
			      case 1:
			        return 'Literario';
			      case 2:
			        return 'Deportivo';
			      case 3:
			        return 'Chicos';
			      case 4:
			        return 'Tecno';
			    }
			  }
		});		



		/*

		$('.markets-slide').bxSlider({
			mode: 'vertical',
			minSlides: 1,
			maxSlides: 1,
			infiniteLoop: true,
			auto: true,
			pager: false,
			controls: false,
			speed: 500,
			slideWidth: 120
		});

		var $marketTabs = $('#market-tabs'),
			$allTabs = $('#market-tabs .tabs a'),
			$allBodys = $('.markets-module .body');

			$marketTabs.on('click', 'a', function(e){

			e.preventDefault();
			var $this = $(this);
			var parent = $this.closest('div.tabs'); 
			parent.find('a').removeClass('active');
			$this.addClass('active');
			 

			$allBodys.hide();
			$('.' + this.id).show();

		});

		*/
		$('.btnSwitch').on('click', function(e){
			e.preventDefault();

			$(this).toggleClass('active');

			$('.editable-content').slideToggle();
			$('.content-resumen').slideToggle();

		});

		var $supleTabs = $('#suple-tabs'),
			$allSupleTabs = $('#suple-tabs .tabs a'),
			$allSupleBodys = $('.suple-module .body');
		

		$supleTabs.on('click', 'a', function(e){

			e.preventDefault();
			var $this = $(this);
			var parent = $this.closest('div.tabs'); 
			parent.find('a').removeClass('active');
			$this.addClass('active');
			 

			$allSupleBodys.hide();
			$('.' + this.id).show();

		});



		$('.styled-select').selectBox();

		$(document).on('click', '.close-live',function(e){
			e.preventDefault();

			/*var liveVideoUrl;*/
			$('.live-module').hide();
			$(this).removeClass('close-live').removeClass('fa-chevron-down').addClass('fa-chevron-left').addClass('open-live');
			$('.live-module .video').empty();
			

		});

		$(document).on('click', '.open-live', function(e){

			e.preventDefault();

			$(this).removeClass('open-live').removeClass('fa-chevron-left').addClass('fa-chevron-down').addClass('close-live');

			$('.live-module').show();
			$('.live-module .video').empty();
			$('.live-module .video').html(liveVideoUrl);

		});

		$('button.scroll-top').on('click', function(e){

			$('body').stop().animate({scrollTop:0}, '500', 'swing');

		});

		$('#search-button').on('click', function(e){
			e.preventDefault();
			$('input.search-input').toggleClass('expanded');
			
			$('input.search-input').focus();
			$('input.search-input').empty();
			$('.wrapper-items ').toggleClass('expanded');
		})

		$menubutton = $('button.menu');

		$menubutton.on('click', function(evt){
			evt.preventDefault();
			$('.wrapper-fixed-menu').toggleClass('opened');
			$(this).toggleClass('fa-bars').toggleClass('fa-times');
			$('body').toggleClass('left-menu');
		})

		 $(".wrapper-fixed-menu").mCustomScrollbar();
		 

		 $(".podcasts .videos-list").mCustomScrollbar({
		 	theme: 'inset-dark'
		 });

		 $('.image').fitVids();
		 $('.video').fitVids();	
		 $('.video-container').fitVids();	


		 var windoWidth = $( window ).width();

		 if ( windoWidth >= 700 ) {
		 	
		 	$(".video-list").mCustomScrollbar({
		 		theme: 'inset-dark'
		 	});

		 } else {
		 	return
		 }
		

		$('.video-list').on('click', 'a', function(e){
			e.preventDefault()

			var $el= $(this),
				dataVid = $el.data('video'),
				$vidContainer = $('.main-video'),
				$vidContainerTitle = $('.latest-videos'),
				$video = $vidContainer.find('.video'),
				$image = $vidContainer.find('.image'),
				$videoTitle = $vidContainerTitle.find('h2'),
				vimeoIfrTemp = '<iframe src="//player.vimeo.com/video/********?title=0&amp;byline=0&amp;portrait=0&amp;color=ff0179&amp;autoplay=1" width="*width*" height="*height*" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
				youtubeIfrTemp = '<iframe width="560" height="315" src="//www.youtube.com/embed/********?showinfo=0&autohide=1&rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'

				
				$image.remove();

				var IfrFinal = youtubeIfrTemp.replace('********', dataVid);	        
				$video.empty();
				$videoTitle.html($el.data('titulo'));
				$video.html(IfrFinal);	
				$video.fitVids();


		})

		$(document).on('click tap touchstart', '#main-video', function(e){

			e.preventDefault();

			var $el = $(this),
				dataVid = $el.data('video'),
				$vidContainer = $('.main-video'),
				$video = $vidContainer.find('.video'),
				youtubeIfrTemp = '<iframe width="560" height="315" src="//www.youtube.com/embed/********?showinfo=0&autohide=1&rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'

			$el.parent().remove();

			
				
			var IfrFinal = youtubeIfrTemp.replace('********', dataVid);	 

			$video.html(IfrFinal);	
			$video.fitVids();
				
				


		});
				
		transformicons.add('.tcon');

	}
	

	$(document).ready(main);	


}());