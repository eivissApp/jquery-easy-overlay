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

To customize some aspects of the plugin behaviour, you can use options. Defaults are:
```
{
	zindex: "99999",
	spin: true,
	delay: 400
}
```

You can pass an object as a second parameter.

```javascript
$("#elementDesired").easyOverlay("start", {
	zindex: 60000, //The default z-index of the overlay is 99999
	spin:
		true // Show the fontawesome loading spinner, it's the default behaviour
		false // No spinner will be shown
		{ url: 'image-web-url', width: 'image-width', height: 'image-height' } // A custom spinner, with an image from a url; sizes can be specified with units or percentages
	delay: 200     //Time in miliseconds for the fadeIn or fadeOut effects of the overlay.
});
```
And set your default values, for all calls of easyOverlay, without passing arguments:
```javascript
jQuery.fn.easyOverlay.options = { /* Here your options */ };
```

**Note**:
  * When using the `stop` option, actually only the `delay` parameter will be relevant;
  * Options passed as arguments will override those setted within jQuery.fn.easyOverlay.options property;

