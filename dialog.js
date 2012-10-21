var Clickable=function(q,u,n,l,o){function g(a,h){function e(){a.addEventListener("touchstart",n,!1);a.addEventListener("touchmove",p,!1);a.addEventListener("touchend",o,!1);a.addEventListener("touchcancel",p,!1)}function i(){a.removeEventListener("touchstart",n);a.removeEventListener("touchmove",p);a.removeEventListener("touchend",o);a.removeEventListener("touchcancel",p)}function g(){var b=a,c;c=a.className.replace(w,"");c=String(c).replace(x,"");b.className=c}function j(a,c){do{if(a===c)return!0;
if(a._clickable)break}while(a=a.parentNode);return!1}function k(b){c=!1;a.disabled||!j(b.target,a)?(b.preventDefault(),f=!1):(f=!0,a.className+=" "+h)}function r(a){a.preventDefault();c=f=!1;g()}function l(b){a.disabled?(b.preventDefault(),c=f=!1):(f?c=!0:(b.preventDefault(),c=!1),f=!1,g())}function n(b){c=!1;if(a.disabled||!j(b.target,a))f=!1;else{f=!0;var d=s=+new Date;setTimeout(function(){f&&d===s&&(a.className+=" "+h)},v)}}function p(){f=c=!1;a.disabled||g()}function o(b){function d(){c=!0;var b=
u.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,q,1,0,0,0,0,!1,!1,!1,!1,0,null);a.dispatchEvent(b)}var e=f;p();e&&!a.disabled&&(b.stopImmediatePropagation?+new Date-s>v?d():(a.className+=" "+h,setTimeout(function(){g();d()},1)):c=!0)}function t(b){b=b||q.event;if(!a.disabled&&c)c=!1;else return b.stopImmediatePropagation&&b.stopImmediatePropagation(),b.preventDefault(),b.stopPropagation(),b.cancelBubble=!0,b.returnValue=!1}var d;a:if(a){try{d=a instanceof Node||a instanceof HTMLElement;
break a}catch(y){}d="object"!==typeof a||"number"!==typeof a.nodeType||"string"!==typeof a.nodeName?!1:!0}else d=!1;if(!d)throw TypeError("element "+a+" must be a DOM element");if(!a._clickable){a._clickable=!0;switch(typeof h){case "undefined":h="active";case "string":break;default:throw TypeError("active class "+h+" must be a string");}a.setAttribute("data-clickable-class",h);var w=RegExp("\\b"+h+"\\b"),f=!1,c=!1,s;if(m.ios||m.android)if(a.style["-webkit-tap-highlight-color"]="rgba(255,255,255,0)",
a.addEventListener("click",t,!1),m.ios){a.addEventListener("DOMNodeInsertedIntoDocument",e,!1);a.addEventListener("DOMNodeRemovedFromDocument",i,!1);a:{for(d=a;d=d.parentNode;)if(d===u){d=!0;break a}d=!1}d&&e()}else e();else a.addEventListener?(a.addEventListener("mousedown",k,!1),a.addEventListener("mousemove",r,!1),a.addEventListener("mouseout",r,!1),a.addEventListener("mouseup",l,!1),a.addEventListener("click",t,!1)):a.attachEvent&&(a.attachEvent("onmousedown",k),a.attachEvent("onmousemove",r),
a.attachEvent("onmouseout",r),a.attachEvent("onmouseup",l),a.attachEvent("onclick",t))}}var x=/^\s+|\s+$/g,v=40,m,i=q.navigator.userAgent,e,j,k;if(k=/\bCPU.*OS (\d+(_\d+)?)/i.exec(i))e="ios",j=k[1].replace("_",".");else if(k=/\bAndroid (\d+(\.\d+)?)/.exec(i))e="android",j=k[1];i={name:e,version:j&&q.parseFloat(j)};i[e]=!0;m=i;e=function(){g.apply(this,arguments)};n&&n.plugin("clickable",function(){g.apply(this,arguments)});l&&l.extend(l.fn,{clickable:function(a){this.forEach(function(e){g(e,a)});
return this}});o&&(o.fn.clickable=function(a){this.each(function(){g(this,a)});return this});e.touchable=function(){return m.ios||m.android};return e}(window,document,window.clik,window.Zepto,window.jQuery);

var Dialog = function (window, document, Clickable) {
	var dialogQueue, platform, version;

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

	function createButton (callback) {
		var button = document.createElement('div');
		button.className = 'app-button';

		button.style.margin                   = '0 4%';
		button.style.padding                  = '12px 0';
		button.style.border                   = '1px solid #060607';
		button.style['-webkit-border-radius'] = '3px';
		button.style[   '-moz-border-radius'] = '3px';
		button.style[        'border-radius'] = '3px';
		button.style[   '-webkit-box-sizing'] = 'border-box';
		button.style[      '-moz-box-sizing'] = 'border-box';
		button.style[           'box-sizing'] = 'border-box';
		button.style.fontSize                 = '18px';
		button.style.fontWeight               = 'bold';
		button.style.lineHeight               = '20px';
		button.style.textShadow               = '0 -1px 0 #1C1C1C';
		button.style.textAlign                = 'center';

		if (platform === 'ios') {
			button.style['-webkit-border-radius'] = '6px';
			button.style[   '-moz-border-radius'] = '6px';
			button.style[        'border-radius'] = '6px';
		}

		Clickable && Clickable(button);
		button.addEventListener('click', callback, false);

		return button;
	}

	function createDialog (options, callback) {
		var dialogContainer = document.createElement('div');
		dialogContainer.className = 'app-dialog-container';
		dialogContainer.style.position   = 'absolute';
		dialogContainer.style.zIndex     = '5000';
		dialogContainer.style.top        = '0';
		dialogContainer.style.left       = '0';
		dialogContainer.style.height     = '100%';
		dialogContainer.style.width      = '100%';
		dialogContainer.style.background = 'rgba(0,0,0, 0.8)';

		dialogContainer.addEventListener('touchstart', preventDefault, false);

		var dialog = document.createElement('div');
		dialog.className = 'app-dialog';
		dialog.style.position              = 'absolute';
		dialog.style.bottom                = '0';
		dialog.style.left                  = '0';
		dialog.style.width                 = '100%';
		dialog.style.background            = '#000';
		dialog.style.borderTop             = '1px solid rgba(124,125,127, 0.2)';
		dialog.style['-webkit-box-shadow'] = '0 -1px 3px rgba(0,0,0, 0.5)';
		dialog.style[   '-moz-box-shadow'] = '0 -1px 3px rgba(0,0,0, 0.5)';
		dialog.style[        'box-shadow'] = '0 -1px 3px rgba(0,0,0, 0.5)';
		dialog.style.color                 = '#FFF';
		dialogContainer.appendChild(dialog);

		if (options.title) {
			var title = document.createElement('div');
			title.className   = 'app-title';
			title.textContent = options.title;
			title.style.position              = 'relative';
			title.style.padding               = '12px 8px';
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
			text.className   = 'app-text';
			text.textContent = options.text;
			text.style.padding         = '12px 32px 0';
			//TODO: gradient
			text.style.backgroundImage = '-webkit-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))';
			text.style.color           = '#A6A7A9';
			text.style.fontSize        = '16px';
			text.style.lineHeight      = '17px';
			text.style.textAlign       = 'center';
			dialog.appendChild(text);
		}

		if (options.successButton || options.cancelButton) {
			var buttons = document.createElement('div');
			buttons.className = 'app-buttons';
			buttons.style.padding = '12px 0';
			//TODO: gradient
			buttons.style.backgroundImage = '-webkit-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))';
			dialog.appendChild(buttons);

			if (options.successButton) {
				var successButton = createButton(function () {
					callback(true);
				});
				successButton.textContent = options.successButton || 'Ok';
			}

			if (options.cancelButton) {
				var cancelButton = createButton(function () {
					callback(false);
				});
				cancelButton.textContent = options.cancelButton || 'Cancel';
			}

			if (options.successButton && options.cancelButton) {
				successButton.style.width      = '44%';
				successButton.style.float      = 'right';
				successButton.style.marginLeft = '0';

				cancelButton.style.width       = '44%';
				cancelButton.style.float       = 'left';
				cancelButton.style.marginRight = '0';
			}

			if (options.cancelButton) {
				buttons.appendChild(cancelButton);
			}
			if (options.successButton) {
				buttons.appendChild(successButton);
			}

			var clear = document.createElement('div');
			clear.className = 'clear';
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

			dialog.style.opacity = '0';

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

		dialog.style.opacity = '0';

		document.body.appendChild(dialog);

		setTimeout(function () {
			dialog.style['-webkit-transition'] = 'opacity 0.2s ease-in-out';
			dialog.style[   '-moz-transition'] = 'opacity 0.2s ease-in-out';
			dialog.style[    '-ms-transition'] = 'opacity 0.2s ease-in-out';
			dialog.style[     '-o-transition'] = 'opacity 0.2s ease-in-out';
			dialog.style[        'transition'] = 'opacity 0.2s ease-in-out';
		}, 0);

		setTimeout(function () {
			dialog.style.opacity = '1';
		}, 10);
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

		switch (typeof options.successButton) {
			case 'string':
				break;

			case 'undefined':
				options.successButton = 'Ok';
				break;

			default:
				throw TypeError('success button must a string if defined, got ' + options.successButton);
		}

		switch (typeof options.cancelButton) {
			case 'string':
				break;

			case 'undefined':
				options.cancelButton = '';
				break;

			default:
				throw TypeError('cancel button must a string if defined, got ' + options.cancelButton);
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
