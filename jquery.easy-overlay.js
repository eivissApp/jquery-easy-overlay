/*
JQuery Easy Overlay v2.0.0

Copyright 2015 Nazzareno Mazzitello, Andrés Cabrera and Contributors

This file is part of jQuery Easy Overlay.

jQuery Easy Overlay is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

jQuery Easy Overlay is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with jQuery Easy Overlay.  If not, see <http://www.gnu.org/licenses/>.
*/
(function( $ ){
	$.fn.easyOverlay = function(action) {
		
		var overlayZIndex;
		
		function init(target) {
			// Calculating OVERLAY DIV z-index
			var targetZIndex = target.css('z-index');
			if (targetZIndex == "auto")
				overlayZIndex = "99999";
			else 
				overlayZIndex = parseFloat(targetZIndex) + 1;
			
			// Putting and Styling OVERLAY DIV if doesn't exist
			if( !$("#jqueryEasyOverlayDiv").length ) {
				var innerDiv = document.createElement('div');
				$(innerDiv)
					.css({ position: "absolute"})
					.attr("id", "jqueryOverlayLoad")
					.html("<i class='fa fa-spin fa-spinner fa-2x'></i>&nbsp;");
				
				var containerDiv = document.createElement('div');	
				$(containerDiv)
					.css({
						display: "none",
						position: "absolute",
						background: "#fff"
					})
					.attr('id',"jqueryEasyOverlayDiv")
					.append(innerDiv);
				
				$("body").append(containerDiv);
			}
			// Calculating Spinner Div positioning
			var topOverlay = ((target.height()/2)-12);
			var leftOverlay = ((target.width()/2)-12);
			if(topOverlay < 0) topOverlay = 0;
			$("#jqueryOverlayLoad").css({
				top  : topOverlay,
				left : leftOverlay
			});
			
			target.data('jquery.easy-overlay', true);
		}
		
		function start(target) {
			// Restoring some CSS of OVERLAY DIV after every 'stop' because jquery.fadeOut method take off it
			$("#jqueryEasyOverlayDiv").css({
				opacity : 0.5,
				zIndex  : overlayZIndex,
				top     :  target.offset().top,
				left    : target.offset().left,
				width   : target.outerWidth(),
				height  : target.outerHeight()
			});
			
			// Show OVERLAY DIV
			$("#jqueryEasyOverlayDiv").fadeIn();
		}
		
		switch (action) {
			case 'start':
				{
					if(this.length > 0) {
						init(this);
						start(this);
					}
				}
				break;
			case 'stop':
				{
					if( $("#jqueryEasyOverlayDiv").length ) $("#jqueryEasyOverlayDiv").fadeOut();
				}
				break;
		}
    	
		return this;
   	}; 
})(jQuery);
