"use strict";
var _typeof =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function(t) {
        return typeof t;
      }
    : function(t) {
        return t &&
          "function" == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? "symbol"
          : typeof t;
      };
window.onload = function() {
  document.querySelectorAll(".footer-flip").forEach(function(t) {
    return t.addEventListener("click", cardflip);
  });
};
function cardflip() {
  var t = this.parentNode.parentNode.parentNode.parentNode.children[0],
    e = this.parentNode.parentNode.parentNode.parentNode.children[1];
  t.classList.toggle("card-hidden"), e.classList.toggle("card-hidden");
}
!(function(t, e) {
  "function" == typeof define && define.amd
    ? define([], e())
    : "object" ===
        ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
      module.exports
    ? (module.exports = e())
    : (function i() {
        document && document.body ? (t.zenscroll = e()) : setTimeout(i, 9);
      })();
})(void 0, function() {
  var t = function(t) {
    return (
      "getComputedStyle" in window &&
      "smooth" === window.getComputedStyle(t)["scroll-behavior"]
    );
  };
  if ("undefined" == typeof window || !("document" in window)) return {};
  var e = function(e, i, n) {
      (i = i || 664), n || 0 === n || (n = 45.5);
      var o,
        a = function(t) {
          o = t;
        },
        r = function() {
          clearTimeout(o), a(0);
        },
        s = function(t) {
          return Math.max(0, e.getTopOf(t) - n);
        },
        h = function(n, o, s) {
          if ((r(), 0 === o || (o && o < 0) || t(e.body))) e.toY(n), s && s();
          else {
            var h = e.getY(),
              l = Math.max(0, n) - h,
              d = new Date().getTime();
            (o = o || Math.min(Math.abs(l), i)),
              (function t() {
                a(
                  setTimeout(function() {
                    var i = Math.min(1, (new Date().getTime() - d) / o),
                      n = Math.max(
                        0,
                        Math.floor(
                          h + l * (i < 0.5 ? 2 * i * i : i * (4 - 2 * i) - 1)
                        )
                      );
                    e.toY(n),
                      i < 1 && e.getHeight() + n < e.body.scrollHeight
                        ? t()
                        : (setTimeout(r, 99), s && s());
                  }, 9)
                );
              })();
          }
        },
        l = function(t, e, i) {
          h(s(t), e, i);
        };
      return {
        setup: function(t, e) {
          return (
            (0 === t || t) && (i = t),
            (0 === e || e) && (n = e),
            { defaultDuration: i, edgeOffset: n }
          );
        },
        to: l,
        toY: h,
        intoView: function(t, i, o) {
          var a = t.getBoundingClientRect().height,
            r = e.getTopOf(t) + a,
            d = e.getHeight(),
            c = e.getY(),
            u = c + d;
          s(t) < c || a + n > d
            ? l(t, i, o)
            : r + n > u
            ? h(r - d + n, i, o)
            : o && o();
        },
        center: function(t, i, n, o) {
          h(
            Math.max(
              0,
              e.getTopOf(t) -
                e.getHeight() / 2 +
                (n || t.getBoundingClientRect().height / 2)
            ),
            i,
            o
          );
        },
        stop: r,
        moving: function() {
          return !!o;
        },
        getY: e.getY,
        getTopOf: e.getTopOf
      };
    },
    i = document.documentElement,
    n = function() {
      return window.scrollY || i.scrollTop;
    },
    o = e({
      body: document.scrollingElement || document.body,
      toY: function(t) {
        window.scrollTo(0, t);
      },
      getY: n,
      getHeight: function() {
        return window.innerHeight || i.clientHeight;
      },
      getTopOf: function(t) {
        return t.getBoundingClientRect().top + n() - i.offsetTop;
      }
    });
  if (
    ((o.createScroller = function(t, n, o) {
      return e(
        {
          body: t,
          toY: function(e) {
            t.scrollTop = e;
          },
          getY: function() {
            return t.scrollTop;
          },
          getHeight: function() {
            return Math.min(
              t.clientHeight,
              window.innerHeight || i.clientHeight
            );
          },
          getTopOf: function(t) {
            return t.offsetTop;
          }
        },
        n,
        o
      );
    }),
    "addEventListener" in window && !window.noZensmooth && !t(document.body))
  ) {
    var a = "scrollRestoration" in history;
    a && (history.scrollRestoration = "auto"),
      window.addEventListener(
        "load",
        function() {
          a &&
            (setTimeout(function() {
              history.scrollRestoration = "manual";
            }, 9),
            window.addEventListener(
              "popstate",
              function(t) {
                t.state && "zenscrollY" in t.state && o.toY(t.state.zenscrollY);
              },
              !1
            )),
            window.location.hash &&
              setTimeout(function() {
                var t = o.setup().edgeOffset;
                if (t) {
                  var e = document.getElementById(
                    window.location.href.split("#")[1]
                  );
                  if (e) {
                    var i = Math.max(0, o.getTopOf(e) - t),
                      n = o.getY() - i;
                    0 <= n && n < 9 && window.scrollTo(0, i);
                  }
                }
              }, 9);
        },
        !1
      );
    var r = new RegExp("(^|\\s)noZensmooth(\\s|$)");
    window.addEventListener(
      "click",
      function(t) {
        for (var e = t.target; e && "A" !== e.tagName; ) e = e.parentNode;
        if (
          !(
            !e ||
            1 !== t.which ||
            t.shiftKey ||
            t.metaKey ||
            t.ctrlKey ||
            t.altKey
          )
        ) {
          if (a)
            try {
              history.replaceState({ zenscrollY: o.getY() }, "");
            } catch (t) {}
          var i = e.getAttribute("href") || "";
          if (0 === i.indexOf("#") && !r.test(e.className)) {
            var n = 0,
              s = document.getElementById(i.substring(1));
            if ("#" !== i) {
              if (!s) return;
              n = o.getTopOf(s);
            }
            t.preventDefault();
            var h = function() {
                window.location = i;
              },
              l = o.setup().edgeOffset;
            l &&
              ((n = Math.max(0, n - l)),
              (h = function() {
                history.pushState(null, "", i);
              })),
              o.toY(n, null, h);
          }
        }
      },
      !1
    );
  }
  return o;
}),
  (function(t, e) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" ===
        ("undefined" == typeof exports ? "undefined" : _typeof(exports))
      ? (module.exports = e(require("jquery")))
      : (t.lightbox = e(t.jQuery));
  })(void 0, function(t) {
    function e(e) {
      (this.album = []),
        (this.currentImageIndex = void 0),
        this.init(),
        (this.options = t.extend({}, this.constructor.defaults)),
        this.option(e);
    }
    return (
      (e.defaults = {
        albumLabel: "Image %1 of %2",
        alwaysShowNavOnTouchDevices: !1,
        fadeDuration: 600,
        fitImagesInViewport: !0,
        imageFadeDuration: 600,
        positionFromTop: 50,
        resizeDuration: 700,
        showImageNumberLabel: !0,
        wrapAround: !1,
        disableScrolling: !1,
        sanitizeTitle: !1
      }),
      (e.prototype.option = function(e) {
        t.extend(this.options, e);
      }),
      (e.prototype.imageCountLabel = function(t, e) {
        return this.options.albumLabel.replace(/%1/g, t).replace(/%2/g, e);
      }),
      (e.prototype.init = function() {
        var e = this;
        t(document).ready(function() {
          e.enable(), e.build();
        });
      }),
      (e.prototype.enable = function() {
        var e = this;
        t("body").on(
          "click",
          "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",
          function(i) {
            return e.start(t(i.currentTarget)), !1;
          }
        );
      }),
      (e.prototype.build = function() {
        var e = this;
        t(
          '<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>'
        ).appendTo(t("body")),
          (this.$lightbox = t("#lightbox")),
          (this.$overlay = t("#lightboxOverlay")),
          (this.$outerContainer = this.$lightbox.find(".lb-outerContainer")),
          (this.$container = this.$lightbox.find(".lb-container")),
          (this.$image = this.$lightbox.find(".lb-image")),
          (this.$nav = this.$lightbox.find(".lb-nav")),
          (this.containerPadding = {
            top: parseInt(this.$container.css("padding-top"), 10),
            right: parseInt(this.$container.css("padding-right"), 10),
            bottom: parseInt(this.$container.css("padding-bottom"), 10),
            left: parseInt(this.$container.css("padding-left"), 10)
          }),
          (this.imageBorderWidth = {
            top: parseInt(this.$image.css("border-top-width"), 10),
            right: parseInt(this.$image.css("border-right-width"), 10),
            bottom: parseInt(this.$image.css("border-bottom-width"), 10),
            left: parseInt(this.$image.css("border-left-width"), 10)
          }),
          this.$overlay.hide().on("click", function() {
            return e.end(), !1;
          }),
          this.$lightbox.hide().on("click", function(i) {
            return "lightbox" === t(i.target).attr("id") && e.end(), !1;
          }),
          this.$outerContainer.on("click", function(i) {
            return "lightbox" === t(i.target).attr("id") && e.end(), !1;
          }),
          this.$lightbox.find(".lb-prev").on("click", function() {
            return (
              0 === e.currentImageIndex
                ? e.changeImage(e.album.length - 1)
                : e.changeImage(e.currentImageIndex - 1),
              !1
            );
          }),
          this.$lightbox.find(".lb-next").on("click", function() {
            return (
              e.currentImageIndex === e.album.length - 1
                ? e.changeImage(0)
                : e.changeImage(e.currentImageIndex + 1),
              !1
            );
          }),
          this.$nav.on("mousedown", function(t) {
            3 === t.which &&
              (e.$nav.css("pointer-events", "none"),
              e.$lightbox.one("contextmenu", function() {
                setTimeout(
                  function() {
                    this.$nav.css("pointer-events", "auto");
                  }.bind(e),
                  0
                );
              }));
          }),
          this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
            return e.end(), !1;
          });
      }),
      (e.prototype.start = function(e) {
        var i = this,
          n = t(window);
        n.on("resize", t.proxy(this.sizeOverlay, this)),
          t("select, object, embed").css({ visibility: "hidden" }),
          this.sizeOverlay(),
          (this.album = []);
        var o = 0;
        function a(t) {
          i.album.push({
            link: t.attr("href"),
            title: t.attr("data-title") || t.attr("title")
          });
        }
        var r,
          s = e.attr("data-lightbox");
        if (s) {
          r = t(e.prop("tagName") + '[data-lightbox="' + s + '"]');
          for (var h = 0; h < r.length; h = ++h)
            a(t(r[h])), r[h] === e[0] && (o = h);
        } else if ("lightbox" === e.attr("rel")) a(e);
        else {
          r = t(e.prop("tagName") + '[rel="' + e.attr("rel") + '"]');
          for (var l = 0; l < r.length; l = ++l)
            a(t(r[l])), r[l] === e[0] && (o = l);
        }
        var d = n.scrollTop() + this.options.positionFromTop,
          c = n.scrollLeft();
        this.$lightbox
          .css({ top: d + "px", left: c + "px" })
          .fadeIn(this.options.fadeDuration),
          this.options.disableScrolling &&
            t("body").addClass("lb-disable-scrolling"),
          this.changeImage(o);
      }),
      (e.prototype.changeImage = function(e) {
        var i = this;
        this.disableKeyboardNav();
        var n = this.$lightbox.find(".lb-image");
        this.$overlay.fadeIn(this.options.fadeDuration),
          t(".lb-loader").fadeIn("slow"),
          this.$lightbox
            .find(
              ".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption"
            )
            .hide(),
          this.$outerContainer.addClass("animating");
        var o = new Image();
        (o.onload = function() {
          var a, r, s, h, l, d;
          n.attr("src", i.album[e].link),
            t(o),
            n.width(o.width),
            n.height(o.height),
            i.options.fitImagesInViewport &&
              ((d = t(window).width()),
              (l = t(window).height()),
              (h =
                d -
                i.containerPadding.left -
                i.containerPadding.right -
                i.imageBorderWidth.left -
                i.imageBorderWidth.right -
                20),
              (s =
                l -
                i.containerPadding.top -
                i.containerPadding.bottom -
                i.imageBorderWidth.top -
                i.imageBorderWidth.bottom -
                120),
              i.options.maxWidth &&
                i.options.maxWidth < h &&
                (h = i.options.maxWidth),
              i.options.maxHeight &&
                i.options.maxHeight < h &&
                (s = i.options.maxHeight),
              (o.width > h || o.height > s) &&
                (o.width / h > o.height / s
                  ? ((r = h),
                    (a = parseInt(o.height / (o.width / r), 10)),
                    n.width(r),
                    n.height(a))
                  : ((a = s),
                    (r = parseInt(o.width / (o.height / a), 10)),
                    n.width(r),
                    n.height(a)))),
            i.sizeContainer(n.width(), n.height());
        }),
          (o.src = this.album[e].link),
          (this.currentImageIndex = e);
      }),
      (e.prototype.sizeOverlay = function() {
        this.$overlay.width(t(document).width()).height(t(document).height());
      }),
      (e.prototype.sizeContainer = function(t, e) {
        var i = this,
          n = this.$outerContainer.outerWidth(),
          o = this.$outerContainer.outerHeight(),
          a =
            t +
            this.containerPadding.left +
            this.containerPadding.right +
            this.imageBorderWidth.left +
            this.imageBorderWidth.right,
          r =
            e +
            this.containerPadding.top +
            this.containerPadding.bottom +
            this.imageBorderWidth.top +
            this.imageBorderWidth.bottom;
        function s() {
          i.$lightbox.find(".lb-dataContainer").width(a),
            i.$lightbox.find(".lb-prevLink").height(r),
            i.$lightbox.find(".lb-nextLink").height(r),
            i.showImage();
        }
        n !== a || o !== r
          ? this.$outerContainer.animate(
              { width: a, height: r },
              this.options.resizeDuration,
              "swing",
              function() {
                s();
              }
            )
          : s();
      }),
      (e.prototype.showImage = function() {
        this.$lightbox
          .find(".lb-loader")
          .stop(!0)
          .hide(),
          this.$lightbox
            .find(".lb-image")
            .fadeIn(this.options.imageFadeDuration),
          this.updateNav(),
          this.updateDetails(),
          this.preloadNeighboringImages(),
          this.enableKeyboardNav();
      }),
      (e.prototype.updateNav = function() {
        var t = !1;
        try {
          document.createEvent("TouchEvent"),
            (t = !!this.options.alwaysShowNavOnTouchDevices);
        } catch (t) {}
        this.$lightbox.find(".lb-nav").show(),
          this.album.length > 1 &&
            (this.options.wrapAround
              ? (t &&
                  this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"),
                this.$lightbox.find(".lb-prev, .lb-next").show())
              : (this.currentImageIndex > 0 &&
                  (this.$lightbox.find(".lb-prev").show(),
                  t && this.$lightbox.find(".lb-prev").css("opacity", "1")),
                this.currentImageIndex < this.album.length - 1 &&
                  (this.$lightbox.find(".lb-next").show(),
                  t && this.$lightbox.find(".lb-next").css("opacity", "1"))));
      }),
      (e.prototype.updateDetails = function() {
        var e = this;
        if (
          void 0 !== this.album[this.currentImageIndex].title &&
          "" !== this.album[this.currentImageIndex].title
        ) {
          var i = this.$lightbox.find(".lb-caption");
          this.options.sanitizeTitle
            ? i.text(this.album[this.currentImageIndex].title)
            : i.html(this.album[this.currentImageIndex].title),
            i
              .fadeIn("fast")
              .find("a")
              .on("click", function(e) {
                void 0 !== t(this).attr("target")
                  ? window.open(t(this).attr("href"), t(this).attr("target"))
                  : (location.href = t(this).attr("href"));
              });
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
          var n = this.imageCountLabel(
            this.currentImageIndex + 1,
            this.album.length
          );
          this.$lightbox
            .find(".lb-number")
            .text(n)
            .fadeIn("fast");
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"),
          this.$lightbox
            .find(".lb-dataContainer")
            .fadeIn(this.options.resizeDuration, function() {
              return e.sizeOverlay();
            });
      }),
      (e.prototype.preloadNeighboringImages = function() {
        if (this.album.length > this.currentImageIndex + 1) {
          new Image().src = this.album[this.currentImageIndex + 1].link;
        }
        if (this.currentImageIndex > 0) {
          new Image().src = this.album[this.currentImageIndex - 1].link;
        }
      }),
      (e.prototype.enableKeyboardNav = function() {
        t(document).on("keyup.keyboard", t.proxy(this.keyboardAction, this));
      }),
      (e.prototype.disableKeyboardNav = function() {
        t(document).off(".keyboard");
      }),
      (e.prototype.keyboardAction = function(t) {
        var e = t.keyCode,
          i = String.fromCharCode(e).toLowerCase();
        27 === e || i.match(/x|o|c/)
          ? this.end()
          : "p" === i || 37 === e
          ? 0 !== this.currentImageIndex
            ? this.changeImage(this.currentImageIndex - 1)
            : this.options.wrapAround &&
              this.album.length > 1 &&
              this.changeImage(this.album.length - 1)
          : ("n" !== i && 39 !== e) ||
            (this.currentImageIndex !== this.album.length - 1
              ? this.changeImage(this.currentImageIndex + 1)
              : this.options.wrapAround &&
                this.album.length > 1 &&
                this.changeImage(0));
      }),
      (e.prototype.end = function() {
        this.disableKeyboardNav(),
          t(window).off("resize", this.sizeOverlay),
          this.$lightbox.fadeOut(this.options.fadeDuration),
          this.$overlay.fadeOut(this.options.fadeDuration),
          t("select, object, embed").css({ visibility: "visible" }),
          this.options.disableScrolling &&
            t("body").removeClass("lb-disable-scrolling");
      }),
      new e()
    );
  });
