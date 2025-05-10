window.setupSmoothScrolling = function () {
  $('a[href^="#"]')
    .off("click")
    .on("click", function (event) {
      if (
        this.getAttribute("target") === "_blank" ||
        !this.pathname.endsWith(
          location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        )
      ) {
        return;
      }

      event.preventDefault();

      var href = this.getAttribute("href");

      if (href === "#") {
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          2000
        );
        return;
      }

      var target = $(href);

      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800
        );
      }
    });
};

window.setupHamburgerMenu = function () {
  $(".hamburger-menu")
    .off("click")
    .on("click", function () {
      $(this).toggleClass("active");

      // Toggle the main-nav open class directly
      if ($(".jumbo-nav").hasClass("open")) {
        // If menu is open, close it with animation
        $(".jumbo-nav").css("right", "-100%");
        setTimeout(function () {
          $(".jumbo-nav").removeClass("open");
          $(".jumbo-nav").css("right", "");
        }, 300);
      } else {
        // If menu is closed, open it
        $(".jumbo-nav").addClass("open");
        $(".jumbo-nav").css("right", "0");
      }
    });

  $(".jumbo-nav a")
    .off("click.hamburger")
    .on("click.hamburger", function () {
      $(".hamburger-menu").removeClass("active");

      // Close the menu
      $(".jumbo-nav").css("right", "-100%");
      setTimeout(function () {
        $(".jumbo-nav").removeClass("open");
        $(".jumbo-nav").css("right", "");
      }, 300);
    });

  $(document)
    .off("click.hamburgerClose")
    .on("click.hamburgerClose", function (event) {
      if (
        !$(event.target).closest(".hamburger-menu").length &&
        !$(event.target).closest(".jumbo-nav").length &&
        $(".jumbo-nav").hasClass("open")
      ) {
        $(".hamburger-menu").removeClass("active");

        // Close the menu when clicking outside
        $(".jumbo-nav").css("right", "-100%");
        setTimeout(function () {
          $(".jumbo-nav").removeClass("open");
          $(".jumbo-nav").css("right", "");
        }, 300);
      }
    });
};

window.setupBackToTopButton = function () {
  var backToTopBtn = $("#back-to-top-btn");
  if (!backToTopBtn.length) return;

  $(window)
    .off("scroll.backToTop")
    .on("scroll.backToTop", function () {
      if ($(this).scrollTop() > 300) {
        backToTopBtn.fadeIn(300);
      } else {
        backToTopBtn.fadeOut(300);
      }
    });

  backToTopBtn.off("click").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("levitating");
    var textElements = $("p, h1, h2, h3, h4, h5, h6, a").filter(function () {
      return !$(this).closest("").length;
    });
    textElements.each(function () {
      var element = $(this);
      var direction = Math.random() > 0.5 ? 1 : -1;
      var delay = Math.random() * 0.8;
      element.css({
        transition: "transform 1s ease " + delay + "s",
        "transform-origin": "center center",
      });
      setTimeout(function () {
        element.css("transform", "rotate(" + 360 * direction + "deg)");
        setTimeout(function () {
          element.css({ transition: "", transform: "" });
        }, 4000);
      }, 1000);
    });
    $("html, body").animate({ scrollTop: 0 }, 1000, function () {
      backToTopBtn.removeClass("levitating");
    });
  });
};
