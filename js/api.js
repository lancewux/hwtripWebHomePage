

var slideDown = function(elem, speed, callback) {
	if(!elem || typeof speed != 'number') {
		console.log('parameter error');
		return;
	}
	if(elem.offsetHeight > 0) {
		return;
	}
	elem.style.display = 'block';
	var totalHeight = elem.offsetHeight;
	var slideDownHeight = totalHeight;
	if (elem.slideUpTimer) {
		console.log('elem.slideUpHeight', elem.slideUpHeight);
		slideDownHeight = elem.slideUpHeight;
		totalHeight = slideDownHeight;
		console.log('slideDownHeight', slideDownHeight);
		clearInterval(elem.slideUpTimer);
		delete elem.slideUpTimer;
		delete elem.slideUpHeight;
	}
	elem.style.height = '0px';
	var startTime = new Date().getTime();
	//t:已消耗的时间, b: 初始值, c: 目标值, d: 总时间
	var linear = function(t, b, c, d) {
		return c*t/d + b;
	}

	if(!elem.slideDownTimer) {
		var timer = setInterval(function() {
			var curTime = new Date().getTime();
			if(curTime >= startTime + speed) {
				elem.style.height = totalHeight + 'px';
				clearInterval(timer);
				delete elem.slideDownTimer;
				delete elem.slideDownHeight;
				if(callback && Object.prototype.toString.call(callback) == '[object Function]') {
					callback();
				}
			} else {
				var curHeight = linear(curTime - startTime, 0, totalHeight, speed);
				elem.style.height = curHeight + 'px';
			}
		}, 19);
		elem.slideDownTimer = timer;
		elem.slideDownHeight = slideDownHeight;
		console.log('slidedown', elem.slideDownHeight);
	}
};

var slideUp = function(elem, speed, callback) {
	if(!elem || typeof speed != 'number') {
		console.log('parameter error');
		return;
	}
	var totalHeight = elem.offsetHeight;
	var slideUpHeight = totalHeight;
	// 处理与slidedown交叉的情况
	if(elem.slideDownTimer) {
		slideUpHeight = elem.slideDownHeight;
		clearInterval(elem.slideDownTimer);
		delete elem.slideDownTimer;
		delete elem.slideDownHeight;
		console.log('slideUpHeight', slideUpHeight);
	}
	var startTime = new Date().getTime();
	//t:已消耗的时间, b: 初始值, c: 目标值, d: 总时间
	var linear = function(t, b, c, d) {
		return b + (c - b) * t / d;
	}
	if(!elem.slideUpTimer && totalHeight > 0) {
		var timer = setInterval(function() {
			var curTime = new Date().getTime();
			if(curTime >= startTime + speed) {
				// 恢复初始状态，不能置0，否则height将永远为0
				elem.style.height = totalHeight + 'px';
				elem.style.display = 'none';
				clearInterval(timer);
				delete elem.slideUpTimer;
				delete elem.slideHeight;
				if(callback && Object.prototype.toString.call(callback) == '[object Function]') {
					callback();
				}
			} else {
				curHeight = linear(curTime - startTime, totalHeight, 0, speed);
				elem.style.height = curHeight + 'px';
			}
		}, 19);
		elem.slideUpTimer = timer;
		elem.slideUpHeight = slideUpHeight;
		console.log('elem.slideUpHeight', elem.slideUpHeight);
	}
};
