jQuery Easy Overlay Plugin
=====================

Easy & Simple jQuery plugin for overlay an existing element with Css & FontAwesome

----------

Requirements
---------
	- JQuery
	- FontAwesome

Getting Started
---------

Include the script on your page

```html
<script src="js/jquery.easy-overlay.js">
```

And, for overlay an existing element
```javascript
$("#elementDesired").easyOverlay("start");
```

For remove the overlay layer
```javascript
$("#elementDesired").easyOverlay("stop");
Or
$.easyOverlay("stop");
```

That's all!

Options
---------

To customize some aspects of the plugin behaviour, you can pass an object as a second parameter.

```javascript
$("#elementDesired").easyOverlay("start", {
	zindex: 60000, //The default z-index of the overlay is 99999
	spin: false,   //Do not show a spinning icon on the overlay
	delay: 200     //Time in miliseconds for the fadeIn or fadeOut effects of the overlay.
});
```

**Note**: When using the `stop` option, actually only the `delay` parameter will be relevant.
