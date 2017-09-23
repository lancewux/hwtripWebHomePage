console.log(encodeURIComponent(window.location));

var addEvent = function(elem, type, handler) {
	if(window.addEventListener) {
		addEvent = function(elem, type, handler) {
			if (elem.length) {
				for (var i = 0; i < elem.length; i++) {
					elem[i].addEventListener(type, handler);
				}
			} else {
				elem.addEventListener(type, handler);
			}
			// elem.addEventListener(type, handler);
		}
	} else {
		addEvent = function(elem, type, handler) {
			if (elem.length) {
				for (var i = 0; i < elem.length; i++) {
					elem[i].attachEvent('on' + type, handler);
				}
			} else {
				elem.attachEvent('on' + type, handler);
			}
			// addEvent = elem.attachEvent('on' + type, handler);
		}
	}
	addEvent(elem, type, handler);
}

// var addEventWithFilter = function(elems, type, filter, handler) {
// 	if(window.addEventListener) {
// 		addEvent = function(elems, type, handler) {
// 			elem.addEventListener(type, handler);
// 		}
// 	} else {
// 		addEvent = function(elem, type, handler) {
// 			addEvent = elem.attachEvent('on' + type, handler);
// 		}
// 	}
// 	addEvent(elem, type, handler);
// }

// addEvent(document.querySelector('dl.head-book>dt'), 'mouseover', function() {
// 	console.log('in');
// 	document.querySelector('dl.head-book>dd').style.display = 'inline-block';
// });

// addEvent(document.querySelector('dl.head-book'), 'mouseout', function() {
// 	console.log('out');
// 	document.querySelector('dl.head-book>dd').style.display = 'none';
// });

// addEvent(document.querySelector('dl.head-wechat>dt'), 'mouseover', function() {
// 	console.log('in');
// 	document.querySelector('dl.head-wechat>dd').style.display = 'inline-block';
// });

// addEvent(document.querySelector('dl.head-wechat'), 'mouseout', function() {
// 	console.log('out');
// 	document.querySelector('dl.head-wechat>dd').style.display = 'none';
// });

// addEvent(document.querySelector('.destination'), 'mouseover', function(event) {
// 	// console.log('ss');
// 	var e = event || window.event;
// 	var target = e.target || e.srcElement;
// 	var classStr = target.getAttribute('class');
// 	if (classStr && /desti-dl/.test(classStr)) {
// 		console.log('ggg');
// 		console.log(target);
// 	}
// 	// console.log(target.getAttribute('class'));
// 	// document.querySelector('dl.head-book>dd').style.display = 'inline-block';
// });

addEvent(document.querySelectorAll('.js-head dl'), 'mouseover', function(event) {
	var e = event || window.event;
	var target = e.target || e.srcElement;
	var classStr = target.getAttribute('class');
	if (/head-book/.test(classStr) || /head-wechat/.test(classStr)) {
		console.log('ccc');
		target.setAttribute('class', classStr + ' on');
	}
});

addEvent(document.querySelectorAll('.js-head dl'), 'mouseout', function(event) {
	var e = event || window.event;
	var target = e.target || e.srcElement;
	var classStr = target.getAttribute('class');
	if (/head-book/.test(classStr) || /head-wechat/.test(classStr)) {
		console.log('ggg');
		var tmp = classStr.replace(/ on/g, '');
		console.log(tmp);
		target.setAttribute('class', tmp);
	}
});