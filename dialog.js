var Dialog = function (window, document, Clickable) {
	var head     = document.querySelector('head'),
		linkTags = [],
		dialogQueue,
		platform, version;

	if (match = /\bCPU.*OS (\d+(_\d+)?)/i.exec(navigator.userAgent)) {
		platform = 'ios';
		version = parseFloat( match[1] );
	}
	else if (match = /\bAndroid (\d+(\.\d+(\.\d+)?)?)/.exec(navigator.userAgent)) {
		platform = 'android';
		version = parseFloat( match[1] );
	}

	function preventDefault (e) {
		e.preventDefault();
	}

	function clearLinkTags (timeout) {
		var tags = linkTags.splice(0);

		setTimeout(function () {
			tags.forEach(function (tag) {
				try {
					head.removeChild(tag);
				}
				catch (err) {}
			});
		}, timeout || 0);
	}

	function createButton (callback) {
		var button = document.createElement('div');

		button.style.margin                   = '0 4%';
		button.style.padding                  = '12px 0';
		button.style.border                   = '1px solid #060607';
		button.style['-webkit-border-radius'] = '3px';
		button.style[   '-moz-border-radius'] = '3px';
		button.style[        'border-radius'] = '3px';
		button.style[   '-webkit-box-sizing'] = 'border-box';
		button.style[      '-moz-box-sizing'] = 'border-box';
		button.style[           'box-sizing'] = 'border-box';
		button.style.color                    = '#FFF';
		button.style.fontSize                 = '18px';
		button.style.fontWeight               = 'bold';
		button.style.lineHeight               = '20px';
		button.style.textShadow               = '0 -1px 0 #1C1C1C';
		button.style.textAlign                = 'center';

		var downState = 'color: #EEE !important;'
						+ 'background-image: -webkit-gradient(linear, left top, left bottom, from(#15171D), to(#1D1E25)) !important;'
						+ 'background-image: -webkit-linear-gradient(top, #15171D, #1D1E25) !important;'
						+ 'background-image: -moz-linear-gradient(top, #15171D, #1D1E25) !important;'
						+ 'background-image: -ms-linear-gradient(top, #15171D, #1D1E25) !important;'
						+ 'background-image: -o-linear-gradient(top, #15171D, #1D1E25) !important;'
						+ 'background-image: linear-gradient(top, #15171D, #1D1E25) !important;';

		if (platform === 'ios') {
			button.style.backgroundImage          = '-webkit-gradient(linear, left top, left bottom, from(#3D3E45), to(#191A22))';
			button.style.backgroundImage          = '-webkit-linear-gradient(top, #3D3E45, #191A22)';
			button.style.backgroundImage          = '-moz-linear-gradient(top, #3D3E45, #191A22)';
			button.style.backgroundImage          = '-ms-linear-gradient(top, #3D3E45, #191A22)';
			button.style.backgroundImage          = '-o-linear-gradient(top, #3D3E45, #191A22)';
			button.style.backgroundImage          = 'linear-gradient(top, #3D3E45, #191A22)';
			button.style['-webkit-box-shadow']    = 'inset 0 1px 1px #5C5E63';
			button.style[   '-moz-box-shadow']    = 'inset 0 1px 1px #5C5E63';
			button.style[        'box-shadow']    = 'inset 0 1px 1px #5C5E63';
			button.style['-webkit-border-radius'] = '6px';
			button.style[   '-moz-border-radius'] = '6px';
			button.style[        'border-radius'] = '6px';

			downState += '-webkit-box-shadow: inset 0 1px 2px #070814 !important;'
						+ '-moz-box-shadow: inset 0 1px 2px #070814 !important;'
						+ 'box-shadow: inset 0 1px 2px #070814 !important;';
		}
		else {
			button.style.backgroundImage = '-webkit-gradient(linear, left top, left bottom, from(#3D3E45), to(#15171D))';
			button.style.backgroundImage = '-webkit-linear-gradient(top, #3D3E45, #15171D)';
			button.style.backgroundImage = '-moz-linear-gradient(top, #3D3E45, #15171D)';
			button.style.backgroundImage = '-ms-linear-gradient(top, #3D3E45, #15171D)';
			button.style.backgroundImage = '-o-linear-gradient(top, #3D3E45, #15171D)';
			button.style.backgroundImage = 'linear-gradient(top, #3D3E45, #15171D)';
		}

		button.id = ('x'+Math.random()).replace(/\-|\./g,'');
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'data:text/css,#'+button.id+'.active{'+downState+'}';
		head.appendChild(link);

		linkTags.push(link);

		Clickable && Clickable(button);
		button.addEventListener('click', callback, false);

		return button;
	}

	function createDialog (options, callback) {
		var dialogContainer = document.createElement('div');
		dialogContainer.style.position   = 'fixed';
		dialogContainer.style.zIndex     = '5000';
		dialogContainer.style.top        = '0';
		dialogContainer.style.left       = '0';
		dialogContainer.style.margin     = '0';
		dialogContainer.style.padding    = '0';
		dialogContainer.style.height     = '100%';
		dialogContainer.style.width      = '100%';
		dialogContainer.style.background = 'rgba(0,0,0, 0.8)';
		dialogContainer.style.overflow   = 'hidden';

		if ((platform !== 'android') || (version >= 4)) {
			dialogContainer.addEventListener('touchstart', preventDefault, false);
		}

		var dialog = document.createElement('div');
		dialog.style.position              = 'absolute';
		dialog.style.bottom                = '0';
		dialog.style.left                  = '0';
		dialog.style.margin                = '0';
		dialog.style.padding               = '0';
		dialog.style.width                 = '100%';
		dialog.style.background            = '#000';
		dialog.style.borderTop             = '1px solid rgba(124,125,127, 0.2)';
		dialog.style['-webkit-box-shadow'] = '0 -1px 3px rgba(0,0,0, 0.5)';
		dialog.style[   '-moz-box-shadow'] = '0 -1px 3px rgba(0,0,0, 0.5)';
		dialog.style[        'box-shadow'] = '0 -1px 3px rgba(0,0,0, 0.5)';
		dialog.style.color                 = '#FFF';

		if (platform === 'android') {
			dialog.style.fontFamily = '"Roboto", sans-serif';
		}
		else {
			dialog.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
		}

		dialogContainer.appendChild(dialog);

		if (options.title) {
			var title = document.createElement('div');
			title.textContent = options.title;
			title.style.position              = 'relative';
			title.style.padding               = '12px 8px';
			title.style.margin                = '0';
			title.style.background            = 'rgba(26,27,31, 0.97)';
			title.style.borderBottom          = '1px solid rgba(18,18,21, 0.97)';
			title.style['-webkit-box-shadow'] = '0 1px 0 rgba(49,50,55, 0.97)';
			title.style[   '-moz-box-shadow'] = '0 1px 0 rgba(49,50,55, 0.97)';
			title.style[        'box-shadow'] = '0 1px 0 rgba(49,50,55, 0.97)';
			title.style.fontSize              = '17px';
			title.style.fontWeight            = 'bold';
			title.style.lineHeight            = '18px';
			title.style.textAlign             = 'center';
			dialog.appendChild(title);
		}

		if (options.text) {
			var text = document.createElement('div');
			text.textContent = options.text;
			text.style.padding         = '12px 32px 0';
			text.style.margin          = '0';
			text.style.backgroundImage = '-webkit-gradient(linear, left top, left bottom, from(rgba(27,29,34, 0.97)), to(rgba(24,26,31, 0.97)))';
			text.style.backgroundImage = '-webkit-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))';
			text.style.backgroundImage = '-moz-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))';
			text.style.backgroundImage = '-ms-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))';
			text.style.backgroundImage = '-o-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))';
			text.style.backgroundImage = 'linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))';
			text.style.color           = '#A6A7A9';
			text.style.fontSize        = '16px';
			text.style.lineHeight      = '17px';
			text.style.textAlign       = 'center';
			dialog.appendChild(text);
		}

		if (options.success || options.cancel) {
			var buttons = document.createElement('div');
			buttons.style.padding = '12px 0';
			buttons.style.margin  = '0';
			buttons.style.backgroundImage = '-webkit-gradient(linear, left top, left bottom, from(rgba(24,26,31, 0.97)), to(rgba(20,22,28, 0.97)))';
			buttons.style.backgroundImage = '-webkit-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))';
			buttons.style.backgroundImage = '-moz-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))';
			buttons.style.backgroundImage = '-ms-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))';
			buttons.style.backgroundImage = '-o-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))';
			buttons.style.backgroundImage = 'linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))';
			dialog.appendChild(buttons);

			if (options.success) {
				var successButton = createButton(function () {
					callback(true);
				});
				successButton.textContent = options.success || 'Ok';
			}

			if (options.cancel) {
				var cancelButton = createButton(function () {
					callback(false);
				});
				cancelButton.textContent = options.cancel || 'Cancel';
			}

			if (options.success && options.cancel) {
				successButton.style.width      = '44%';
				successButton.style['float']   = 'right';
				successButton.style.marginLeft = '0';

				cancelButton.style.width       = '44%';
				cancelButton.style['float']    = 'left';
				cancelButton.style.marginRight = '0';
			}

			if (options.cancel) {
				buttons.appendChild(cancelButton);
			}
			if (options.success) {
				buttons.appendChild(successButton);
			}

			var clear = document.createElement('div');
			clear.style.margin  = '0';
			clear.style.padding = '0';
			clear.style.clear   = 'both';
			buttons.appendChild(clear);
		}

		return dialogContainer;
	}

	function showDialog (options, callback, force) {
		if (!force && dialogQueue) {
			dialogQueue.push([ options, callback ]);
			return;
		}

		dialogQueue = dialogQueue || [];

		var dialogLock = false;

		var dialog = createDialog(options, function (status) {
			if (dialogLock) {
				return;
			}
			dialogLock = true;

			if (platform === 'ios') {
				dialog.style.background = 'rgba(0,0,0, 0)';
				innerDialog.style['-webkit-transform'] = 'translate3d(0,100%,0)';
				innerDialog.style[   '-moz-transform'] = 'translate3d(0,100%,0)';
				innerDialog.style[    '-ms-transform'] = 'translate3d(0,100%,0)';
				innerDialog.style[     '-o-transform'] = 'translate3d(0,100%,0)';
				innerDialog.style[        'transform'] = 'translate3d(0,100%,0)';
			}
			else {
				dialog.style.opacity = '0';
			}

			clearLinkTags(600);

			setTimeout(function () {
				processDialogQueue();
				callback(status);
			}, 0);

			setTimeout(function () {
				try {
					document.body.removeChild(dialog);
				}
				catch (err) {}
			}, 600);
		});
		var innerDialog = dialog.firstChild;

		if (platform === 'ios') {
			dialog.style.background = 'rgba(0,0,0, 0)';
			innerDialog.style['-webkit-transform'] = 'translate3d(0,100%,0)';
			innerDialog.style[   '-moz-transform'] = 'translate3d(0,100%,0)';
			innerDialog.style[    '-ms-transform'] = 'translate3d(0,100%,0)';
			innerDialog.style[     '-o-transform'] = 'translate3d(0,100%,0)';
			innerDialog.style[        'transform'] = 'translate3d(0,100%,0)';
		}
		else {
			dialog.style.opacity = '0';
		}

		document.body.appendChild(dialog);

		setTimeout(function () {
			if (platform === 'ios') {
				dialog.style['-webkit-transition'] = 'background 0.2s ease-in-out';
				dialog.style[   '-moz-transition'] = 'background 0.2s ease-in-out';
				dialog.style[    '-ms-transition'] = 'background 0.2s ease-in-out';
				dialog.style[     '-o-transition'] = 'background 0.2s ease-in-out';
				dialog.style[        'transition'] = 'background 0.2s ease-in-out';
				innerDialog.style['-webkit-transition'] = '-webkit-transform 0.2s ease-in-out';
				innerDialog.style[   '-moz-transition'] =    '-moz-transform 0.2s ease-in-out';
				innerDialog.style[    '-ms-transition'] =     '-ms-transform 0.2s ease-in-out';
				innerDialog.style[     '-o-transition'] =      '-o-transform 0.2s ease-in-out';
				innerDialog.style[        'transition'] =         'transform 0.2s ease-in-out';
			}
			else {
				dialog.style['-webkit-transition'] = 'opacity 0.2s ease-in-out';
				dialog.style[   '-moz-transition'] = 'opacity 0.2s ease-in-out';
				dialog.style[    '-ms-transition'] = 'opacity 0.2s ease-in-out';
				dialog.style[     '-o-transition'] = 'opacity 0.2s ease-in-out';
				dialog.style[        'transition'] = 'opacity 0.2s ease-in-out';
			}

			setTimeout(function () {
				if (platform === 'ios') {
					dialog.style.background = 'rgba(0,0,0, 0.8)';
					innerDialog.style['-webkit-transform'] = 'translate3d(0,0,0)';
					innerDialog.style[   '-moz-transform'] = 'translate3d(0,0,0)';
					innerDialog.style[    '-ms-transform'] = 'translate3d(0,0,0)';
					innerDialog.style[     '-o-transform'] = 'translate3d(0,0,0)';
					innerDialog.style[        'transform'] = 'translate3d(0,0,0)';
				}
				else {
					dialog.style.opacity = '1';
				}
			}, 10);
		}, 0);
	}

	function processDialogQueue () {
		if ( !dialogQueue ) {
			return;
		}

		if ( !dialogQueue.length ) {
			dialogQueue = null;
			return;
		}

		var args = dialogQueue.shift();
		args.push(true);
		showDialog.apply(window, args);
	}

	return function (options, callback) {
		switch (typeof options) {
			case 'string':
				options = { text : options };
				break;

			case 'object':
				break;

			default:
				throw TypeError('dialog options must be an object, got ' + options);
		}

		switch (typeof options.title) {
			case 'string':
				break;

			case 'undefined':
				options.title = '';
				break;

			default:
				throw TypeError('dialog title must a string if defined, got ' + options.title);
		}

		if (typeof options.text !== 'string') {
			throw TypeError('dialog text must a string, got ' + options.text);
		}

		switch (typeof options.success) {
			case 'string':
				break;

			case 'undefined':
				options.success = 'Ok';
				break;

			default:
				throw TypeError('success button must a string if defined, got ' + options.success);
		}

		switch (typeof options.cancel) {
			case 'string':
				break;

			case 'undefined':
				options.cancel = '';
				break;

			default:
				throw TypeError('cancel button must a string if defined, got ' + options.cancel);
		}

		switch (typeof callback) {
			case 'undefined':
				callback = function () {};
				break;

			case 'function':
				break;

			default:
				throw TypeError('callback must be a function if defined, got ' + callback);
		}

		return showDialog(options, callback);
	};
}(window, document, window.Clickable);
