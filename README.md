dialog.js - modal dialogs for mobile web apps
==================================================

window.alert & window.confirm are ugly non-customizable. They are also blocking so that no JavaScript can be run while the dialog is present.

Dialog.js tries to solve this with a HTML-based dialog with customizable buttons and text. It's simple, easy to use, and lightweight.

Dialog.js will work on its own without any dependencies, but if you drop in [clickable.js](https://github.com/kikinteractive/clickable) buttons will automatically perform better and will get native-like downstates.


Links
-----

[Download script (v1.0.0 minified)](http://cdn.kik.com/dialog/1.0.0/dialog.js)

[View demo](http://code.kik.com/dialog/demos/basic.html)


Usage
-----

```js
Dialog({
	title   : 'This is a title!' ,
	text    : 'This is some text to tell the user what is happening and what to do.' ,
	success : 'Ok' ,
	cancel  : 'Cancel' ,
}, function (status) {
	if (status) {
		// user clicked the success button
	}
	else {
		// user clicked the cancel button
	}
});
```

If a dialog is already open when another is called, it will be queued and launched immediately after the previous one is resolved.
