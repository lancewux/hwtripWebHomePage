
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
};

var addEventToElems = function(elems, type, handler) {
	for (var i = 0; i < elems.length; i++) {
		addEvent(elems[i], type, handler);
	}
};

var contains = function(parentNode, childNode) {
	if(parentNode.contains) {
		return parentNode != childNode && parentNode.contains(childNode);
	} else {
		return !!(parentNode.compareDocumentPosition(childNode) & 16);
	}
};

var hover = function(elem, mouseovercb, mouseoutcb) {
	addEvent(elem, 'mouseover', function(event) {
		var e = event || window.event;
		var relatedTarget = e.relatedTarget || e.fromElement;
		if (elem != relatedTarget && !contains(elem, relatedTarget)) {
			mouseovercb.call(elem, event);
		}
	});
	addEvent(elem, 'mouseout', function(event) {
		var e = event || window.event;
		var relatedTarget = e.relatedTarget || e.toElement;
		if (elem != relatedTarget && !contains(elem, relatedTarget)) {
			mouseoutcb.call(elem, event);
		}
	});
};

var hoverOfelems = function(elems, cb1, cb2) {
	for (var i = 0; i < elems.length; i++) {
		hover(elems[i], cb1, cb2);
	}
}

var addClass = function(elem, name) {
	elem.setAttribute('class', elem.getAttribute('class') + ' ' + name);
};

var removeClass = function(elem, name) {
	var oldClass = elem.getAttribute('class');
	var re = new RegExp(' ' + name, 'g');
	var newClass = oldClass.replace(re, '');
	elem.setAttribute('class', newClass);
}

hoverOfelems(document.querySelectorAll('.js-head dl'), function(event) {
	var elem = this;
	var classStr = elem.getAttribute('class');
	elem.setAttribute('class', classStr + ' on');
	var eldd = elem.querySelector('dd');
	if(eldd) {
		eldd.style.display = 'block';
	}
	var eli = elem.querySelector('i.f12');
	if(eli) {
		eli.innerHTML = '▼';
	}
}, function(event) {
	var elem = this;
	var classStr = elem.getAttribute('class');
	var tmp = classStr.replace(/ on/g, '');
	elem.setAttribute('class', tmp);
	var eldd = elem.querySelector('dd');
	if(eldd) {
		eldd.style.display = 'none';
	}
	var eli = elem.querySelector('i.f12');
	if(eli) {
		eli.innerHTML = '▲';
	}
});

hoverOfelems(document.querySelectorAll('.desti-dl'), function(event) {
	addClass(this, 'cur');
}, function(event) {
	removeClass(this, 'cur');
});

hover(document.querySelector('#js-a-youlun'), function(e) {
	console.log('mouseover');
	addClass(this.querySelector('i'), 'i-sub-up');
	slideDown(this.querySelector('.sub'), 100);
}, function(e) {
	console.log('mouseout');
	removeClass(this.querySelector('i'), 'i-sub-up');
	slideUp(this.querySelector('.sub'), 100);
});

// slideDown();


