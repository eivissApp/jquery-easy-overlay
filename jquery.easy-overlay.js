/*
JQuery Easy Overlay v2.3.3

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

		// Preparing options
		var defaults = {
            zindex: "99999",
            spin: true,
            delay: 400,
        };
        var _options = $.extend(true, defaults, $.fn.easyOverlay.options || {}, options || {});

		// States constants
		var STATE_VISIBLE = 1;
		var STATE_HIDDEN = 0;
		
		function init(target) {
			if(target.length <= 0 || target.data('easyOverlayState') == STATE_VISIBLE) return;
			target.data('easyOverlayInitiated', true);
			$.fn.easyOverlay.indexCounter++;
			var easyOverlayIndex = $.fn.easyOverlay.indexCounter;
			
			// Calculating OVERLAY DIV z-index
			var overlayZIndex;
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
			var spinWidth = _options.spin.width.slice(0, _options.spin.width.length - 2);
			var spinHeight = _options.spin.height.slice(0, _options.spin.height.length - 2);
			var spinTop = ((target.height()/2)-(spinWidth / 2));
			var spinLeft = ((target.width()/2)-(spinHeight / 2));
			if(spinTop < 0) spinTop = 0;
			$("#jqueryOverlayLoad"+easyOverlayIndex).css({
				top  : spinTop,
				left : spinLeft
			});
			target.data('easyOverlayIndex', easyOverlayIndex);
		}
		
		function start(target) {
			var easyOverlayIndex = target.data('easyOverlayIndex');
			// Restoring some CSS of OVERLAY DIV after every 'stop' because jquery.fadeOut method take off it
			$("#jqueryEasyOverlayDiv"+easyOverlayIndex).css({
				opacity : 0.5,
				top     : target.offset().top,
				left    : target.offset().left,
				width   : target.outerWidth(),
				height  : target.outerHeight()
			});
			
			// Show OVERLAY DIV
			$("#jqueryEasyOverlayDiv"+easyOverlayIndex).fadeIn(_options.delay);
			target.data('easyOverlayState', STATE_VISIBLE);
		}

		function stop(target) {
			var easyOverlayIndex = target.data('easyOverlayIndex');
			if( $("#jqueryEasyOverlayDiv"+easyOverlayIndex).length ) {
				$("#jqueryEasyOverlayDiv"+easyOverlayIndex).fadeOut(_options.delay);
			}
			target.data('easyOverlayState', STATE_HIDDEN);
		}

		switch (action) {
			case 'start':
				{
					if(this.length == 1) {
						if (typeof this.data('easyOverlayInitiated') == 'undefined') {
							init(this);
						}
						start(this);
					}
				}
				break;
			case 'stop':
				{
					if (this.length == 1) {
						stop(this);
					}
				}
				break;
		}
    	
		return this;
			
	}
	$.fn.easyOverlay.indexCounter = 0;
})(jQuery);
