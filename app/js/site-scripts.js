document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-form")) {
    openForm(e, e.target);
  }
  if (e.target.classList.contains("form__btn-close")) {
    openForm(e, e.target, 1);
  }
});

let openForm = (e, t, f = 0) => {
  e.preventDefault();
  if (f !== 1) {
    let form = t.getAttribute("data-form");
    document.querySelector(".form-popup").classList.add("active");
    document.querySelector("form." + form).classList.add("active");
  } else {
    e.preventDefault();
    t.closest("form").classList.remove("active");
    t.closest(".form-popup").classList.remove("active");
  }
};

// Плавный скролл до якоря
//---------------------------------------------------------
document.querySelectorAll(".scroll-to").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    let href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);

    //const topOffset = document.querySelector('.scrollto').offsetHeight;
    // const topOffset = 0; // если не нужен отступ сверху
    const topOffset = 0;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Появление элементов при скролле
//-----------------------------------------------------
// Получаем нужный элемент
var elements = document.querySelectorAll(".anime");

var Visible = function (target) {
  // Все позиции элемента
  var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
    },
    // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight,
    };

  let anime = target.getAttribute("data-anime");

  if (
    targetPosition.bottom > windowPosition.top + 100 && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom - 180 && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right
  ) {
    // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
    // Если элемент полностью видно, то запускаем следующий код
    target.style.visibility = "visible";
    target.style.animationDuration = "2s";
    target.classList.add("animated", anime);
  } else {
    // Если элемент не видно, то запускаем этот код
    target.style.visibility = "hidden";
    target.classList.remove("animated", anime);
  }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener("scroll", function () {
  if (elements) {
    elements.forEach(function (item) {
      Visible(item);
    });
  }
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
if (elements) {
  elements.forEach(function (item) {
    Visible(item);
  });
}

/* Меняем svg в img на svg */

(function () {
  String.prototype.toSVG = function (obj) {
    var defaultObj = {
      svgClass: "svg",
      onComplete: function () {},
    };

    function extend(one, two) {
      if (typeof two != "object") return false;
      for (var key in one) {
        if (two.hasOwnProperty(key)) break;
        two[key] = one[key];
      }
      return two;
    }

    var params = extend(defaultObj, obj);

    var getSVG = function (file, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", file, true);
      xhr.send(); // (1)
      xhr.onreadystatechange = function () {
        // (3)
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          console.log(xhr.status + ": " + xhr.statusText);
        } else {
          callback.call(this, xhr.responseText);
        }
      };
    };

    Array.prototype.forEach.call(
      document.querySelectorAll(this),
      function (el) {
        var img = el;
        var imgID = img.getAttribute("id");
        var imgClass = img.getAttribute("class");
        var imgURL = img.getAttribute("src");
        if (!/\.(svg)$/i.test(imgURL)) {
          console.warn(
            "image src='" + imgURL + "' is not a SVG, item remained tag <img/> "
          );
          return;
        }
        getSVG(imgURL, function (data) {
          var html = document.createElement("html");
          html.innerHTML = "<body>" + data + "</body>";
          var svg = html.getElementsByTagName("svg")[0];
          if (imgID != undefined && imgID != null) {
            svg.setAttribute("id", imgID);
          }
          if (typeof imgClass !== "undefined") {
            svg.setAttribute("class", imgClass + " " + params.svgClass);
          }
          svg.removeAttribute("xmlns:a");
          if (
            !svg.getAttribute("viewBox") &&
            svg.getAttribute("height") &&
            svg.getAttribute("width")
          ) {
            svg.getAttribute(
              "viewBox",
              "0 0 " +
                svg.getAttribute("height") +
                " " +
                svg.getAttribute("width")
            );
          }
          img.parentNode.replaceChild(svg, img);
          typeof params.onComplete == "function"
            ? params.onComplete.call(this, svg)
            : "";
        });
      }
    );
  };
  ".svg".toSVG({
    svgClass: "replaced",
    onComplete: function () {},
  });
})();

window.addEventListener("scroll", (event) => {
  var elem = document.getElementById("gotop");
  var y = scrollY;
  if (y > 200) {
    elem.classList.add("visible");
  } else {
    elem.classList.remove("visible");
  }
});

function Ant(crslId) {

	let id = document.getElementById(crslId);
	if(id) {
		this.crslRoot = id
	}
	else {
		this.crslRoot = document.querySelector('.ant-carousel')
	};

	// Carousel objects
	this.crslList = this.crslRoot.querySelector('.ant-carousel-list');
	this.crslElements = this.crslList.querySelectorAll('.ant-carousel-element');
	this.crslElemFirst = this.crslList.querySelector('.ant-carousel-element');
	this.leftArrow = this.crslRoot.querySelector('div.ant-carousel-arrow-left');
	this.rightArrow = this.crslRoot.querySelector('div.ant-carousel-arrow-right');
	this.indicatorDots = this.crslRoot.querySelector('div.ant-carousel-dots');

	// Initialization
	this.options = Ant.defaults;
	Ant.initialize(this)
};

let eVisible = 2

Ant.defaults = {

	// Default options for the carousel
	elemVisible: 2, // Кол-во отображаемых элементов в карусели
	loop: true,     // Бесконечное зацикливание карусели 
	auto: true,     // Автоматическая прокрутка
	interval: 5000, // Интервал между прокруткой элементов (мс)
	speed: 750,     // Скорость анимации (мс)
	touch: true,    // Прокрутка  прикосновением
	arrows: true,   // Прокрутка стрелками
	dots: true      // Индикаторные точки
};

Ant.prototype.elemPrev = function(num) {
	num = num || 1;

	if(this.options.dots) this.dotOn(this.currentElement);
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.dotsVisible-1;
	if(this.options.dots) this.dotOff(this.currentElement);

	if(!this.options.loop) {  // сдвиг вправо без цикла
		this.currentOffset += this.elemWidth*num;
		this.crslList.style.marginLeft = this.currentOffset + 'px';
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'; this.touchPrev = false
		}
		this.rightArrow.style.display = 'block'; this.touchNext = true
	}
	else {                    // сдвиг вправо с циклом
		let elm, buf, this$ = this;
		for(let i=0; i<num; i++) {
			elm = this.crslList.lastElementChild;
			buf = elm.cloneNode(true);
			this.crslList.insertBefore(buf, this.crslList.firstElementChild);
			this.crslList.removeChild(elm)
		};
		this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
		let compStyle = window.getComputedStyle(this.crslList).marginLeft;
		this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
		this.crslList.style.marginLeft = '0px';
		setTimeout(function() {
			this$.crslList.style.cssText = 'transition:none;'
		}, this.options.speed)
	}
};

Ant.prototype.elemNext = function(num) {
	num = num || 1;

	if(this.options.dots) this.dotOn(this.currentElement);
	this.currentElement += num;
	if(this.currentElement >= this.dotsVisible) this.currentElement = 0;
	if(this.options.dots) this.dotOff(this.currentElement);

	if(!this.options.loop) {  // сдвиг влево без цикла
		this.currentOffset -= this.elemWidth*num;
		this.crslList.style.marginLeft = this.currentOffset + 'px';
		if(this.currentElement == this.dotsVisible-1) {
			this.rightArrow.style.display = 'none'; this.touchNext = false
		}
		this.leftArrow.style.display = 'block'; this.touchPrev = true
	}
	else {                    // сдвиг влево с циклом
		let elm, buf, this$ = this;
		this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
		this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
		setTimeout(function() {
			this$.crslList.style.cssText = 'transition:none;';
			for(let i=0; i<num; i++) {
				elm = this$.crslList.firstElementChild;
				buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
				this$.crslList.removeChild(elm)
			};
			this$.crslList.style.marginLeft = '0px'
		}, this.options.speed)
	}
};

Ant.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Ant.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Ant.initialize = function(that) {

	// Constants
	that.elemCount = that.crslElements.length; // Количество элементов
	that.dotsVisible = that.elemCount;         // Число видимых точек
	let elemStyle = window.getComputedStyle(that.crslElemFirst);
	that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
	  parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

	// Variables
	that.currentElement = 0; that.currentOffset = 0;
	that.touchPrev = true; that.touchNext = true;
	let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
		that.options.auto = false; that.options.touch = false;
		that.options.arrows = false; that.options.dots = false;
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};

	if(!that.options.loop) {       // если нет цикла - уточнить количество точек
		that.dotsVisible = that.elemCount - that.options.elemVisible + 1;
		that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.touchPrev = false;    // отключить прокрутку прикосновением вправо
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		that.crslList.addEventListener('mouseenter', function() {
    	clearInterval(that.autoScroll)
    }, false);
		that.crslList.addEventListener('mouseleave', setAutoScroll, false)
	};

	if(that.options.touch) {   // инициализация прокрутки прикосновением
		that.crslList.addEventListener('touchstart', function(e) {
			xTouch = parseInt(e.touches[0].clientX);
			yTouch = parseInt(e.touches[0].clientY);
			stTime = getTime()
		}, false);
		that.crslList.addEventListener('touchmove', function(e) {
			if(!xTouch || !yTouch) return;
			xDiff = xTouch - parseInt(e.touches[0].clientX);
			yDiff = yTouch - parseInt(e.touches[0].clientY);
			mvTime = getTime();
			if(Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && mvTime - stTime < 75) {
				stTime = 0;
				if(that.touchNext && xDiff > 0) {
					bgTime = mvTime; that.elemNext()
				}
				else if(that.touchPrev && xDiff < 0) {
					bgTime = mvTime; that.elemPrev()
				}
			}
		}, false)
	};

	if(that.options.arrows) {  // инициализация стрелок
		if(!that.options.loop) that.crslList.style.cssText =
      'transition:margin '+that.options.speed+'ms ease;';
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > that.options.speed) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > that.options.speed) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none'
	};

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let i=0; i<that.dotsVisible; i++) {
			sum += '<span class="ant-dot"></span>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.crslRoot.querySelectorAll('span.ant-dot');
		// Назначаем точкам обработчик события 'click'
		for(let n=0; n<that.dotsVisible; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function() {
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если n == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let i=1; i<that.dotsVisible; i++) {
			that.dotOn(i)
		}
	}
};


new Ant();
