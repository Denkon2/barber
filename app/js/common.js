$(function () {
  $('[data-fancybox="gallery"]').fancybox({
    // Options will go here
  });

  // Start scroll element
  const anchors = document.querySelectorAll('a[href*="#"].scroll-to');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  // End scroll element

  $(".owl-carousel-1").owlCarousel({
    loop: true, //Зацикливаем слайдер
    margin: 10, //Отступ от элемента справа в 50px
    center: true,
    nav: true, //Отключение навигации
    autoplay: false, //Автозапуск слайдера
    smartSpeed: 1000, //Время движения слайда
    autoplayTimeout: 2000, //Время смены слайда
    responsive: {
      //Адаптивность. Кол-во выводимых элементов при определенной ширине.
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  let owl = $(".owl-carousel-2");

  owl.owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    autoplay: true,
    autoplaySpeed: 800,
    navText: ["<", ">"], // Тут можно установить текст для наших кнопок "Влево", "Вправо".
    items: 1, // IMPORTANT
    responsive: {
      480: { items: 1 },
      800: { items: 2 },
      1024: { items: 3 },
    },
  });
  // Function for detect center item FOR 3 ITEMS (Change i==1) for your element
  // Функция для определения центрального элемента. В данный момент для 3-х элементов внутри слайдера.
  // Измените количество в "i==1",
  // до нужного вам количества, чтобы точно определять центральный элемент.
  function set_owl_center() {
    owl.find(".active").removeClass("owl-center");
    setTimeout(function () {
      owl.find(".active").each(function (i) {
        if (i == 1) {
          $(this).addClass("my-center");
          $(this).prev().addClass("my-center-prev");
          $(this).next().addClass("my-center-next");
        }
      });
    }, 80);
  }
  set_owl_center(); // Init center

  owl.on("changed.owl.carousel", function (event) {
    set_owl_center();
  }); // On changes

  $.validator.messages.required = "";

  $(".popup-form").on("click", function (e) {
    e.preventDefault();
    let form = $(this).attr("data-form");
    $(".form-popup").addClass("active");
    $(".form-popup ." + form).addClass("active");
  });

  $(".form-bg, .form__btn-close").on("click", function (e) {
    e.preventDefault();
    $(".form-popup").removeClass("active");
    $(".form-popup form").removeClass("active");
  });

  $(".button_menu").on("click", function (e) {
    e.preventDefault();
    $(".mobile-menu").addClass("visible");
  });

  $(".mobile-menu__close").on("click", function (e) {
    e.preventDefault();
    $(".mobile-menu").removeClass("visible");
  });

  $("input[type=tel]").mask("+7(999) 999-9999");
  $('input[type="tel"]').click(function () {
    $(this).setCursorPosition(3); // set position number
  });
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };

  $(".form1").validate();
  $(".popup1").validate();
  $(".popup2").validate();

  $("form").on("submit", function (e) {
    e.preventDefault();
    let $form = $(this);

    let error = $(this).find("input.error");

    if (error.length == 0) {
      let data = $form.serialize() + "&action=my_action";
      console.log(data);
      $form.find(".form__result").html("result ok");
      /* $.ajax({
        type: "POST",
        dataType: "html",
        url: "myajax.url",
        data: data,
        success: function (data) {
          let result = data;
          $form.find(".result").html(result);
        },
      }); */
    }
  });
});

//tabs_init('.block-tabs')

// tabs function
function tabs_init(element) {
  let e = document.querySelector(element);
  let items = e.querySelectorAll(".tabs-nav__item");
  e.addEventListener("click", ({ target }) => {
    let item = [...e.querySelectorAll(".tabs-nav__item span")].findIndex(
      (e) => e === target
    );
    let content = e.querySelectorAll(".tabs-content__block");
    content.forEach(function (i, ind) {
      i.classList.remove("active");
      items[ind].classList.remove("active");
    });
    items[item].classList.add("active");
    content[item].classList.add("active");
    console.log(content[item]);
  });
}

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

/* Меняем svg в img на svg */
(function () {
  String.prototype.toSVG = function (obj) {
    var defaultObj = {
      svgClass: "replaced-svg",
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
})();

".svg".toSVG({
  svgClass: "replaced",
  onComplete: function () {},
});

/* Для свг спрайта */
(function () {
  "use strict";
  if (typeof window !== "undefined" && window.addEventListener) {
    var cache = Object.create(null); // holds xhr objects to prevent multiple requests
    var checkUseElems;
    var tid; // timeout id
    var debouncedCheck = function () {
      clearTimeout(tid);
      tid = setTimeout(checkUseElems, 100);
    };
    var unobserveChanges = function () {
      return;
    };
    var observeChanges = function () {
      var observer;
      window.addEventListener("resize", debouncedCheck, false);
      window.addEventListener("orientationchange", debouncedCheck, false);
      if (window.MutationObserver) {
        observer = new MutationObserver(debouncedCheck);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
        });
        unobserveChanges = function () {
          try {
            observer.disconnect();
            window.removeEventListener("resize", debouncedCheck, false);
            window.removeEventListener(
              "orientationchange",
              debouncedCheck,
              false
            );
          } catch (ignore) {}
        };
      } else {
        document.documentElement.addEventListener(
          "DOMSubtreeModified",
          debouncedCheck,
          false
        );
        unobserveChanges = function () {
          document.documentElement.removeEventListener(
            "DOMSubtreeModified",
            debouncedCheck,
            false
          );
          window.removeEventListener("resize", debouncedCheck, false);
          window.removeEventListener(
            "orientationchange",
            debouncedCheck,
            false
          );
        };
      }
    };
    var createRequest = function (url) {
      // In IE 9, cross origin requests can only be sent using XDomainRequest.
      // XDomainRequest would fail if CORS headers are not set.
      // Therefore, XDomainRequest should only be used with cross origin requests.
      function getOrigin(loc) {
        var a;
        if (loc.protocol !== undefined) {
          a = loc;
        } else {
          a = document.createElement("a");
          a.href = loc;
        }
        return a.protocol.replace(/:/g, "") + a.host;
      }
      var Request;
      var origin;
      var origin2;
      if (window.XMLHttpRequest) {
        Request = new XMLHttpRequest();
        origin = getOrigin(location);
        origin2 = getOrigin(url);
        if (
          Request.withCredentials === undefined &&
          origin2 !== "" &&
          origin2 !== origin
        ) {
          Request = XDomainRequest || undefined;
        } else {
          Request = XMLHttpRequest;
        }
      }
      return Request;
    };
    var xlinkNS = "http://www.w3.org/1999/xlink";
    checkUseElems = function () {
      var base;
      var bcr;
      var fallback = ""; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
      var hash;
      var href;
      var i;
      var inProgressCount = 0;
      var isHidden;
      var Request;
      var url;
      var uses;
      var xhr;
      function observeIfDone() {
        // If done with making changes, start watching for chagnes in DOM again
        inProgressCount -= 1;
        if (inProgressCount === 0) {
          // if all xhrs were resolved
          unobserveChanges(); // make sure to remove old handlers
          observeChanges(); // watch for changes to DOM
        }
      }
      function attrUpdateFunc(spec) {
        return function () {
          if (cache[spec.base] !== true) {
            spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
            if (spec.useEl.hasAttribute("href")) {
              spec.useEl.setAttribute("href", "#" + spec.hash);
            }
          }
        };
      }
      function onloadFunc(xhr) {
        return function () {
          var body = document.body;
          var x = document.createElement("x");
          var svg;
          xhr.onload = null;
          x.innerHTML = xhr.responseText;
          svg = x.getElementsByTagName("svg")[0];
          if (svg) {
            svg.setAttribute("aria-hidden", "true");
            svg.style.position = "absolute";
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = "hidden";
            body.insertBefore(svg, body.firstChild);
          }
          observeIfDone();
        };
      }
      function onErrorTimeout(xhr) {
        return function () {
          xhr.onerror = null;
          xhr.ontimeout = null;
          observeIfDone();
        };
      }
      unobserveChanges(); // stop watching for changes to DOM
      // find all use elements
      uses = document.getElementsByTagName("use");
      for (i = 0; i < uses.length; i += 1) {
        try {
          bcr = uses[i].getBoundingClientRect();
        } catch (ignore) {
          // failed to get bounding rectangle of the use element
          bcr = false;
        }
        href =
          uses[i].getAttribute("href") ||
          uses[i].getAttributeNS(xlinkNS, "href") ||
          uses[i].getAttribute("xlink:href");
        if (href && href.split) {
          url = href.split("#");
        } else {
          url = ["", ""];
        }
        base = url[0];
        hash = url[1];
        isHidden =
          bcr &&
          bcr.left === 0 &&
          bcr.right === 0 &&
          bcr.top === 0 &&
          bcr.bottom === 0;
        if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
          // the use element is empty
          // if there is a reference to an external SVG, try to fetch it
          // use the optional fallback URL if there is no reference to an external SVG
          if (
            fallback &&
            !base.length &&
            hash &&
            !document.getElementById(hash)
          ) {
            base = fallback;
          }
          if (uses[i].hasAttribute("href")) {
            uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
          }
          if (base.length) {
            // schedule updating xlink:href
            xhr = cache[base];
            if (xhr !== true) {
              // true signifies that prepending the SVG was not required
              setTimeout(
                attrUpdateFunc({
                  useEl: uses[i],
                  base: base,
                  hash: hash,
                }),
                0
              );
            }
            if (xhr === undefined) {
              Request = createRequest(base);
              if (Request !== undefined) {
                xhr = new Request();
                cache[base] = xhr;
                xhr.onload = onloadFunc(xhr);
                xhr.onerror = onErrorTimeout(xhr);
                xhr.ontimeout = onErrorTimeout(xhr);
                xhr.open("GET", base);
                xhr.send();
                inProgressCount += 1;
              }
            }
          }
        } else {
          if (!isHidden) {
            if (cache[base] === undefined) {
              // remember this URL if the use element was not empty and no request was sent
              cache[base] = true;
            } else if (cache[base].onload) {
              // if it turns out that prepending the SVG is not necessary,
              // abort the in-progress xhr.
              cache[base].abort();
              delete cache[base].onload;
              cache[base] = true;
            }
          } else if (base.length && cache[base]) {
            setTimeout(
              attrUpdateFunc({
                useEl: uses[i],
                base: base,
                hash: hash,
              }),
              0
            );
          }
        }
      }
      uses = "";
      inProgressCount += 1;
      observeIfDone();
    };
    var winLoad;
    winLoad = function () {
      window.removeEventListener("load", winLoad, false); // to prevent memory leaks
      tid = setTimeout(checkUseElems, 0);
    };
    if (document.readyState !== "complete") {
      // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
      window.addEventListener("load", winLoad, false);
    } else {
      // No need to add a listener if the document is already loaded, initialize immediately.
      winLoad();
    }
  }
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

// прогресс загрузки
(function () {
  function id(v) {
    return document.getElementById(v);
  }
  function loadbar() {
    var ovrl = id("overlay"),
      prog = id("progress"),
      stat = id("progstat"),
      img = document.images,
      c = 0,
      tot = img.length;
    if (tot == 0) return doneLoading();

    function imgLoaded() {
      c += 1;
      var perc = (((100 / tot) * c) << 0) + "%";
      prog.style.width = perc;
      stat.innerHTML = "Loading " + perc;
      if (c === tot) return doneLoading();
    }
    function doneLoading() {
      ovrl.style.opacity = 0;
      setTimeout(function () {
        ovrl.style.display = "none";
      }, 1200);
    }
    for (var i = 0; i < tot; i++) {
      var tImg = new Image();
      tImg.onload = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src = img[i].src;
    }
    wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 100,
      mobile: false,
      live: true,
    });
    wow.init();
  }
  document.addEventListener("DOMContentLoaded", loadbar, false);
})();
