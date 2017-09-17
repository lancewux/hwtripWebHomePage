console.log(encodeURIComponent(window.location));

var addEvent = function(elem, type, handler) {
	if(window.addEventListener) {
		addEvent = function(elem, type, handler) {
			elem.addEventListener(type, handler);
		}
	} else {
		addEvent = function(elem, type, handler) {
			addEvent = elem.attachEvent('on' + type, handler);
		}
	}
	addEvent(elem, type, handler);
}

addEvent(document.querySelector('dl.head-book>dt'), 'mouseover', function() {
	console.log('in');
	document.querySelector('dl.head-book>dd').style.display = 'inline-block';
});

addEvent(document.querySelector('dl.head-book'), 'mouseout', function() {
	console.log('out');
	document.querySelector('dl.head-book>dd').style.display = 'none';
});

addEvent(document.querySelector('dl.head-wechat>dt'), 'mouseover', function() {
	console.log('in');
	document.querySelector('dl.head-wechat>dd').style.display = 'inline-block';
});

addEvent(document.querySelector('dl.head-wechat'), 'mouseout', function() {
	console.log('out');
	document.querySelector('dl.head-wechat>dd').style.display = 'none';
});