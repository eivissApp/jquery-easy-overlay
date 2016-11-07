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
	$.fn.easyOverlay = function(action, options) {
		
		var defaults = {
            zindex: "99999",
            spin: true,
            delay: 400,
        };

        var _options = $.extend({}, defaults, options || {});
		var overlayZIndex;
		$.fn.easyOverlay.indexCounter++;
		
		function init(target) {
			var easyOverlayIndex = $.fn.easyOverlay.indexCounter;
			if(target.length <= 0) return;
			
			// Calculating OVERLAY DIV z-index
			overlayZIndex;
			var targetZIndex = target.css('z-index');
			if (targetZIndex == "auto")
				overlayZIndex = _options.zindex;
			else 
				overlayZIndex = parseFloat(targetZIndex) + 1;
			
			// Putting and Styling OVERLAY DIV if doesn't exist
			if( !$("#jqueryEasyOverlayDiv"+easyOverlayIndex).length ) {
				var innerDiv = document.createElement('div');
				if (typeof _options.spin == 'object') {
					$(innerDiv)
					.css({ position: "absolute", "background-image": "url(" + _options.spin.url + ")", "background-size": "100%", width: _options.spin.width, height: _options.spin.height })
					.attr("id", "jqueryOverlayLoad"+easyOverlayIndex);
				} else if (_options.spin) {
					$(innerDiv)
					.css({ position: "absolute" })
					.attr("id", "jqueryOverlayLoad"+easyOverlayIndex)
					.html("<i class='fa fa-spin fa-spinner fa-2x'></i>&nbsp;");
				} else {
					$(innerDiv)
					.css({ position: "absolute" })
					.attr("id", "jqueryOverlayLoad"+easyOverlayIndex);
				}
				
				
				var containerDiv = document.createElement('div');	
				$(containerDiv)
					.css({
						display: "none",
						position: "absolute",
						background: "#fff"
					})
					.attr('id',"jqueryEasyOverlayDiv"+easyOverlayIndex)
					.append(innerDiv);
				
				$("body").append(containerDiv);
			}

			// Calculating Spinner Div positioning
			var topOverlay = ((target.height()/2)-12);
			var leftOverlay = ((target.width()/2)-12);
			if(topOverlay < 0) topOverlay = 0;
			$("#jqueryOverlayLoad"+easyOverlayIndex).css({
				top  : topOverlay,
				left : leftOverlay
			});
			target.data('easyOverlayIndex', easyOverlayIndex);
		}
		
		function start(target) {
			var easyOverlayIndex = $.fn.easyOverlay.indexCounter;
			// Restoring some CSS of OVERLAY DIV after every 'stop' because jquery.fadeOut method take off it
			$("#jqueryEasyOverlayDiv"+easyOverlayIndex).css({
				opacity : 0.5,
				zIndex  : overlayZIndex,
				top     : target.offset().top,
				left    : target.offset().left,
				width   : target.outerWidth(),
				height  : target.outerHeight()
			});
			
			// Show OVERLAY DIV
			$("#jqueryEasyOverlayDiv"+easyOverlayIndex).fadeIn(_options.delay);
		}

		function stop(target) {
			var easyOverlayIndex = target.data('easyOverlayIndex');
			if( $("#jqueryEasyOverlayDiv"+easyOverlayIndex).length ) {
				$("#jqueryEasyOverlayDiv"+easyOverlayIndex).fadeOut(_options.delay, function(){this.remove()});
			}
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
					if (this.length > 0) {
						stop(this);
					}
				}
				break;
		}
    	
		return this;
			
	}
	$.fn.easyOverlay.indexCounter = 0;
})(jQuery);
