window.setupMembershipAnimations = function () {
  $(window)
    .off("scroll.membership")
    .on("scroll.membership", function () {
      var scrollPosition = $(this).scrollTop();

      if ($(".membership-section").length) {
        var sectionPosition = $(".membership-section").offset().top;

        if (scrollPosition > sectionPosition - 500) {
          $(".benefit").each(function (i) {
            setTimeout(
              function (element) {
                $(element).addClass("visible");
              },
              i * 200,
              this
            );
          });
        }
      }
    });

  $(".benefit").addClass("benefit-animation");
};

window.setupHeaderEyes = function () {
  if (!$(".magic-eyes").data("initialAnimationDone")) {
    setTimeout(function () {
      $(".magic-eyes").css("transform", "translate(-50%, -50%) scale(1.2)");
      setTimeout(function () {
        $(".magic-eyes").css("transform", "translate(-50%, -50%)");
      }, 500);
    }, 1000);
    $(".magic-eyes").data("initialAnimationDone", true);
  }

  $(document)
    .off("mousemove.headerEyes")
    .on("mousemove.headerEyes", function (e) {
      $(".magic-eyes .pupil").each(function () {
        const pupil = $(this);
        const eye = pupil.parent();
        const eyeRect = eye[0].getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const eyeRadius = eye.width() / 2;
        const maxDistance = eyeRadius - pupil.width() / 2;
        const distance = Math.min(
          Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 5,
          maxDistance
        );
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        pupil.css(
          "transform",
          `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`
        );
      });
    });

  if (window.blinkInterval) clearInterval(window.blinkInterval);

  function randomBlink() {
    const minDelay = 2000;
    const maxDelay = 6000;
    const randomDelay =
      Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
    window.blinkInterval = setTimeout(function () {
      $(".magic-eyes .eye").addClass("blinking");
      setTimeout(function () {
        $(".magic-eyes .eye").removeClass("blinking");
      }, 500);
      randomBlink();
    }, randomDelay);
  }

  if (!$(".magic-eyes").data("initialBlinkDone")) {
    setTimeout(function () {
      $(".magic-eyes .eye").addClass("blinking");
      setTimeout(function () {
        $(".magic-eyes .eye").removeClass("blinking");
      }, 500);
    }, 1000);
    randomBlink();
    $(".magic-eyes").data("initialBlinkDone", true);
  }
};
