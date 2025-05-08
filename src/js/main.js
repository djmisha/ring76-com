// Wrap all functionalities in named functions and attach to window object

window.setupSmoothScrolling = function () {
  // Fix the smooth scrolling code to handle empty "#" links
  $('a[href^="#"]')
    .off("click")
    .on("click", function (event) {
      // Added .off("click") to prevent multiple bindings

      // If the link is intended to open in a new tab, or is not a same-page anchor, let the browser handle it.
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

      // Handle the case where href is just "#"
      if (href === "#") {
        // Scroll to top of page
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          2000
        );
        return;
      }

      // Otherwise proceed with normal anchor link behavior
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

window.setupEventCardHover = function () {
  $(".event-card")
    .off("mouseenter mouseleave")
    .hover(
      // Added .off()
      function () {
        $(this).find("h3").css("color", "#c41212");
      },
      function () {
        $(this).find("h3").css("color", "");
      }
    );
};

window.setupMembershipAnimations = function () {
  $(window)
    .off("scroll.membership")
    .on("scroll.membership", function () {
      // Added .off() and namespaced event
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

  $(".benefit").addClass("benefit-animation"); // This might only need to run once, or be re-applied if elements are new
};

window.setupContactForm = function () {
  if ($("#contact-form").length > 0) {
    const contactForm = $("#contact-form");

    // Add error styling for form validation (ensure this isn't duplicated)
    if ($("style#contactFormStyles").length === 0) {
      $("<style id='contactFormStyles'>") // Added ID to prevent duplication
        .prop("type", "text/css")
        .html(
          `
        .form-group.has-error input,
        .form-group.has-error textarea {
          border-color: #d9534f;
          box-shadow: 0 0 0 0.2rem rgba(217, 83, 79, 0.25);
        }
        
        .error-message {
          color: #d9534f;
          font-size: 0.85em;
          margin-top: 5px;
          display: block;
          height: 20px;
          transition: all 0.3s;
        }
        
        .form-response {
          padding: 15px;
          margin-top: 20px;
          border-radius: 4px;
          transition: all 0.3s;
        }
        
        .form-response.success {
          background-color: #dff0d8;
          border: 1px solid #d6e9c6;
          color: #3c763d;
        }
        
        .form-response.error {
          background-color: #f2dede;
          border: 1px solid #ebccd1;
          color: #a94442;
        }
      `
        )
        .appendTo("head");
    }

    contactForm.off("submit").on("submit", function (e) {
      // Added .off()
      e.preventDefault();

      if (validateForm()) {
        // Check honeypot field - if it's filled, it's likely a bot
        if ($("#website").val().length > 0) {
          console.log("Bot submission detected");
          showFormResponse("success", "Thank you for your message!"); // Show success to bot but don't actually submit
          return false;
        }

        // Submit the form via AJAX
        const formData = $(this).serialize();

        $.ajax({
          url: $(this).attr("action"),
          method: "POST",
          data: formData,
          dataType: "json",
          success: function (response) {
            if (response.success) {
              contactForm[0].reset();
              showFormResponse("success", response.message);
            } else {
              showFormResponse(
                "error",
                response.message ||
                  "There was an error sending your message. Please try again."
              );
            }
          },
          error: function () {
            showFormResponse(
              "error",
              "There was an error sending your message. Please try again."
            );
          },
        });
      }

      return false;
    });

    // Live validation as user types
    $("#name, #email, #message")
      .off("blur")
      .on("blur", function () {
        // Added .off()
        validateField($(this));
      });

    function validateForm() {
      let isValid = true;
      if (!validateField($("#name"))) isValid = false;
      if (!validateField($("#email"))) isValid = false;
      if (!validateField($("#message"))) isValid = false;
      return isValid;
    }

    function validateField($field) {
      const fieldId = $field.attr("id");
      const value = $field.val().trim();
      const $errorElement = $("#" + fieldId + "-error");
      const $formGroup = $field.closest(".form-group");

      $formGroup.removeClass("has-error");
      $errorElement.text("");

      switch (fieldId) {
        case "name":
          if (value === "") {
            $errorElement.text("Please enter your name");
            $formGroup.addClass("has-error");
            return false;
          }
          break;
        case "email":
          if (value === "") {
            $errorElement.text("Please enter your email address");
            $formGroup.addClass("has-error");
            return false;
          } else if (!isValidEmail(value)) {
            $errorElement.text("Please enter a valid email address");
            $formGroup.addClass("has-error");
            return false;
          }
          break;
        case "message":
          if (value === "") {
            $errorElement.text("Please enter your message");
            $formGroup.addClass("has-error");
            return false;
          }
          break;
      }
      return true;
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showFormResponse(type, message) {
      const $formResponse = $("#form-response");
      $formResponse.removeClass("success error").addClass(type);
      $formResponse.html("<p>" + message + "</p>").slideDown();
      if (type === "success") {
        setTimeout(function () {
          $formResponse.slideUp();
        }, 5000);
      }
    }
  }
};

window.setupOwlChatbot = function () {
  const owlResponses = {
    hello: "Hello! How can I help you with magic today?",
    hi: "Hi there! How can I assist you with your magical interests?",
    help: "I can help you learn about our club, upcoming events, or membership benefits. What would you like to know?",
    membership:
      "Joining Ring 76 gives you access to monthly meetings, learning resources, mentorship, performance opportunities, and more!",
    events:
      "We have several exciting events coming up, including Mini-Lectures, Stage Contests, and our annual Installation Banquet.",
    magic:
      "Magic is the art of creating illusions and wonder. Our club is dedicated to advancing this beautiful art form.",
    joke: function () {
      const jokes = [
        "Why don't magicians reveal their secrets? They're afraid no one will conjure up a laugh!",
        "What do you call a magician who lost their magic? Ian.",
        "Did you hear about the magician who was walking down the stairs? He tripped and fell into a trick!",
        "Why did the magician become a gardener? They wanted to try their hand at plant-based magic.",
        "How do magicians pay their bills? With trick-le down economics!",
        "A magician was driving down the road... then he turned into a driveway.",
        "What did the magician say when his rabbit disappeared? 'Hare today, gone tomorrow!'",
        "Why did the magician join the construction crew? To learn about building suspense.",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
    default:
      "I'm still learning about magic. Please ask me something else or contact our club for more information.",
  };

  $(".owl-avatar")
    .off("click")
    .on("click", function () {
      // Added .off()
      $(".chat-window").fadeToggle(300);
      pulseOwl();
      $(".suggestion-tags").show();
    });

  $(".close-chat")
    .off("click")
    .on("click", function () {
      // Added .off()
      $(".chat-window").fadeOut(300);
      setTimeout(function () {
        $(".chat-messages .message:not(:first-child)").remove();
        $(".suggestion-tags").show();
      }, 300);
    });

  $(".send-btn").off("click").on("click", sendMessage); // Added .off()
  $(".chat-input input")
    .off("keypress")
    .on("keypress", function (e) {
      // Added .off()
      if (e.which === 13) {
        sendMessage();
      }
    });

  function sendMessage() {
    const userInput = $(".chat-input input").val().trim();
    if (userInput === "") return;
    $(".chat-messages").append(`<div class="message user">${userInput}</div>`);
    $(".chat-input input").val("");
    $(".suggestion-tags").hide();
    $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);
    setTimeout(function () {
      let botResponse = getBotResponse(userInput.toLowerCase());
      $(".chat-messages").append(
        `<div class="message bot">${botResponse}</div>`
      );
      if (
        botResponse.includes("contact our club") ||
        botResponse.includes("anything else")
      ) {
        setTimeout(() => {
          $(".suggestion-tags").show();
          $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);
        }, 500);
      }
      $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);
      pulseOwl();
    }, 800);
  }

  function getBotResponse(input) {
    for (let keyword in owlResponses) {
      if (input.includes(keyword)) {
        return typeof owlResponses[keyword] === "function"
          ? owlResponses[keyword]()
          : owlResponses[keyword];
      }
    }
    return owlResponses.default;
  }

  function pulseOwl() {
    $(".owl-emoji").css("transform", "scale(1.2)");
    setTimeout(function () {
      $(".owl-emoji").css("transform", "scale(1)");
    }, 200);
  }

  // Clear existing intervals before setting new ones to prevent multiple timers
  if (window.owlPulseInterval) clearInterval(window.owlPulseInterval);
  if (window.owlShakeTimeout) clearTimeout(window.owlShakeTimeout);

  pulseOwl(); // Initial pulse

  window.owlPulseInterval = setInterval(function () {
    if (Math.random() < 0.2) {
      pulseOwl();
    }
  }, 5000);

  function shakeOwl() {
    if ($(".chat-window").is(":hidden")) {
      const shakeSequence = [
        { right: "15px" },
        { right: "25px" },
        { right: "15px" },
        { right: "25px" },
        { right: "20px" },
      ];
      const shakeDurations = [100, 100, 100, 100, 100];
      let sequenceIndex = 0;
      function nextShake() {
        if (sequenceIndex < shakeSequence.length) {
          $(".owl-chatbot").animate(
            shakeSequence[sequenceIndex],
            shakeDurations[sequenceIndex],
            function () {
              sequenceIndex++;
              nextShake();
            }
          );
        } else {
          $(".owl-chatbot")
            .animate({ right: "18px" }, 150)
            .animate({ right: "20px" }, 150);
          setTimeout(function () {
            pulseOwl();
          }, 100);
        }
      }
      nextShake();
    }
  }

  function setupRandomMovements() {
    function scheduleNextShake() {
      const minDelay = 8000;
      const maxDelay = 15000;
      const randomDelay =
        Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
      window.owlShakeTimeout = setTimeout(function () {
        // Store timeout ID
        shakeOwl();
        scheduleNextShake();
      }, randomDelay);
    }
    if (
      $(".owl-chatbot").length > 0 &&
      !$(".owl-chatbot").data("randomMovementsSetup")
    ) {
      // Check if already setup
      $(".owl-chatbot")
        .css({
          bottom: "20px",
          right: "20px",
          opacity: 1,
        })
        .data("randomMovementsSetup", true); // Mark as setup
      scheduleNextShake();
    }
  }
  setupRandomMovements();

  $(".owl-chatbot")
    .off("mouseenter mouseleave")
    .hover(
      // Added .off()
      function () {
        $(this).addClass("owl-hover");
      },
      function () {
        $(this).removeClass("owl-hover");
      }
    );

  // This re-binding of .owl-avatar click was specific, ensure it's correctly managed
  $(".owl-avatar")
    .off("click.owlSpecific")
    .on("click.owlSpecific", function () {
      // Namespaced and .off()
      $(".owl-chatbot").stop(true, true).css({
        opacity: 1,
        right: "20px",
      });
      $(".chat-window").fadeToggle(300);
      pulseOwl();
    });

  $(".tag")
    .off("click")
    .on("click", function () {
      // Added .off()
      const query = $(this).data("query");
      const tagText = $(this).text();
      $(".chat-input input").val(tagText);
      sendMessage();
      $(".suggestion-tags").hide();
    });
};

window.setupHeaderEyes = function () {
  // Initial animation, might not need to re-run if eyes are part of static header
  // If they are re-added to DOM, then this is needed.
  if (!$(".magic-eyes").data("initialAnimationDone")) {
    // Run once
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
      // Added .off() and namespaced
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

  if (window.blinkInterval) clearInterval(window.blinkInterval); // Clear existing interval

  function randomBlink() {
    const minDelay = 2000;
    const maxDelay = 6000;
    const randomDelay =
      Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
    window.blinkInterval = setTimeout(function () {
      // Store interval ID
      $(".magic-eyes .eye").addClass("blinking");
      setTimeout(function () {
        $(".magic-eyes .eye").removeClass("blinking");
      }, 500);
      randomBlink(); // Re-schedule
    }, randomDelay);
  }

  // Initial blink, also might not need re-run unless eyes are re-added
  if (!$(".magic-eyes").data("initialBlinkDone")) {
    // Run once
    setTimeout(function () {
      $(".magic-eyes .eye").addClass("blinking");
      setTimeout(function () {
        $(".magic-eyes .eye").removeClass("blinking");
      }, 500);
    }, 1000);
    randomBlink(); // Start the random blinking cycle
    $(".magic-eyes").data("initialBlinkDone", true);
  }
};

window.setupArtFormHover = function () {
  $(".art-form")
    .off("mouseenter mouseleave")
    .hover(
      // Added .off()
      function () {
        $(this).find(".art-icon").addClass("active");
      },
      function () {
        $(this).find(".art-icon").removeClass("active");
      }
    );

  // Scroll-based animation for #magic-arts
  $(window)
    .off("scroll.artform")
    .on("scroll.artform", function () {
      // Added .off() and namespaced
      var scrollPosition = $(this).scrollTop();
      if ($("#magic-arts").length) {
        var sectionPosition = $("#magic-arts").offset().top;
        // Original code had an empty .each(), assuming it was placeholder or handled by CSS
        // if (scrollPosition > sectionPosition - 500) {
        //   $(".art-form").each(function (i) {});
        // }
      }
    });
};

window.setupHamburgerMenu = function () {
  $(".hamburger-menu")
    .off("click")
    .on("click", function () {
      // Added .off()
      $(this).toggleClass("active");
      $(".main-nav").toggleClass("open");
    });

  $(".main-nav a")
    .off("click.hamburger")
    .on("click.hamburger", function () {
      // Added .off() and namespaced
      $(".hamburger-menu").removeClass("active");
      $(".main-nav").removeClass("open");
    });

  $(document)
    .off("click.hamburgerClose")
    .on("click.hamburgerClose", function (event) {
      // Added .off() and namespaced
      if (
        !$(event.target).closest(".hamburger-menu").length &&
        !$(event.target).closest(".main-nav").length &&
        $(".main-nav").hasClass("open")
      ) {
        $(".hamburger-menu").removeClass("active");
        $(".main-nav").removeClass("open");
      }
    });
};

// Moved createSparkle outside to be a global helper if needed, or keep it scoped if only for magic tricks
window.createSparkle = function () {
  // Made global for transitions.js if needed, or could be passed
  const sparkle = $("<div>", { class: "magic-sparkle" });
  const xPos = Math.random() * window.innerWidth;
  const yPos = Math.random() * window.innerHeight;
  const size = Math.random() * 15 + 3;
  const colors = [
    "#d4ac0d",
    "#8b0000",
    "#fff",
    "#ffc107",
    "#ff9800",
    "#e91e63",
    "#9c27b0",
    "#3f51b5",
    "#2196f3",
    "#4caf50",
    "#ff5722",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  let shape = "circle";
  const shapeRandom = Math.random();
  let rotation = Math.random() * 360;
  let extraCSS = {};

  if (shapeRandom > 0.7) {
    shape = "star";
    extraCSS = {
      clipPath:
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      backgroundColor: "transparent",
      border: `2px solid ${color}`,
    };
  } else if (shapeRandom > 0.4) {
    shape = "diamond";
    extraCSS = {
      transform: `rotate(${rotation}deg)`,
      backgroundColor: "transparent",
      border: `2px solid ${color}`,
    };
  }
  const animationDuration = Math.random() * 800 + 600;
  const animationDelay = Math.random() * 300;
  sparkle.css({
    left: xPos + "px",
    top: yPos + "px",
    width: size + "px",
    height: size + "px",
    backgroundColor: color,
    borderRadius: shape === "circle" ? "50%" : shape === "diamond" ? "0%" : "",
    opacity: 0,
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "none",
    animation: `sparkle ${animationDuration}ms ${animationDelay}ms forwards`,
    boxShadow: `0 0 ${size / 3}px ${color}`,
    ...extraCSS,
  });
  sparkle.appendTo("body");
  setTimeout(function () {
    sparkle.remove();
  }, animationDuration + animationDelay);
};

window.createMagicParticle = function () {
  // Made global
  const particle = $("<div>", { class: "magic-particle" });
  const xPos = Math.random() * window.innerWidth;
  const yPos = Math.random() * window.innerHeight;
  const size = Math.random() * 8 + 2;
  const colors = [
    "#d4ac0d",
    "#ffd700",
    "#ffcc00",
    "#8b0000",
    "#ff9800",
    "#fff",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = Math.random() * 2000 + 1000;
  particle.css({
    position: "fixed",
    left: xPos + "px",
    top: yPos + "px",
    width: size + "px",
    height: size + "px",
    backgroundColor: color,
    borderRadius: "50%",
    boxShadow: `0 0 ${size}px ${color}`,
    opacity: 0,
    zIndex: 10001,
    pointerEvents: "none",
  });
  $("body").append(particle);
  const destX = Math.random() * window.innerWidth;
  const destY = Math.random() * window.innerHeight;
  particle.animate({ opacity: 1 }, 200, function () {
    $(this).animate(
      { left: destX + "px", top: destY + "px", opacity: 0.7 },
      duration,
      function () {
        $(this).animate({ opacity: 0 }, 300, function () {
          $(this).remove();
        });
      }
    );
  });
};

window.setupMagicTricks = function () {
  $("#flip-trick")
    .off("click")
    .on("click", function (e) {
      // Added .off()
      e.preventDefault();
      const sparkleDuration = 2000;
      for (let i = 0; i < 150; i++) {
        window.createSparkle();
      } // Use window.createSparkle
      setTimeout(function () {
        $("body").toggleClass("magic-upside-down");
        if ($("body").hasClass("magic-upside-down")) {
          if ($(".magic-message").length === 0) {
            // Prevent multiple messages
            $("<div>", {
              class: "magic-message",
              html: "You've been magically flipped! <a href='#' id='restore-magic'>Restore</a>",
            }).appendTo("body");
          }
          $("#restore-magic")
            .off("click")
            .on("click", function (ev) {
              // Added .off()
              ev.preventDefault();
              $("body").removeClass("magic-upside-down");
              $(".magic-message").remove();
            });
        } else {
          $(".magic-message").remove();
        }
      }, sparkleDuration);
    });

  $(".magic-eyes")
    .off("click.sparkle")
    .on("click.sparkle", function (e) {
      // Added .off() and namespaced
      e.preventDefault();
      for (let i = 0; i < 300; i++) {
        window.createSparkle();
      } // Use window.createSparkle
    });

  $("#secret-trick")
    .off("click")
    .on("click", function (e) {
      // Added .off()
      e.preventDefault();
      showSecretOverlay();
    });

  function showSecretOverlay() {
    if ($("#secret-overlay").length === 0) {
      const overlay = $("<div>", {
        id: "secret-overlay",
        class: "secret-overlay",
        html: `
          <div class="secret-content">
            <h2 class="secret-heading">
              The Magician is not keeping the secret <span class="emphasis">from</span> you.<br>
              The Magician is keeping the secret <span class="emphasis">for</span> you.
            </h2>
            <p class="secret-explanation">
              Magic is the art of wonder and astonishment. By preserving its mysteries,
              magicians ensure that you can experience the genuine joy of being amazed—the very
              feeling that makes magic special. When we safeguard these secrets, we're protecting
              your opportunity to experience true wonder in a world that too rarely surprises us.
            </p>
            <button class="secret-close content-btn">Enchanted & Ready!</button>
          </div>
        `,
      });
      $("body").append(overlay);
      // Add CSS for overlay (ensure this isn't duplicated)
      if ($("style#secretOverlayStyles").length === 0) {
        $("<style id='secretOverlayStyles'>") // Added ID
          .prop("type", "text/css")
          .html(
            `
            .secret-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.95); z-index: 10000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s ease; }
            .secret-overlay.visible { opacity: 1; }
            .secret-content { max-width: 900px; padding: 40px; text-align: center; color: #fff; background-color: rgba(20, 20, 20, 0.85); border-radius: 10px; box-shadow: 0 0 30px rgba(212, 172, 13, 0.5); transform: scale(0.9); transition: transform 0.5s ease; margin: 20px; }
            .secret-overlay.visible .secret-content { transform: scale(1); }
            .secret-heading { font-family: 'Lobster Two', cursive; font-size: 2.5rem; line-height: 1.4; margin-bottom: 30px; color: #d4ac0d; }
            .secret-heading .emphasis { font-size: 2.8rem; font-weight: bold; color: #fff; text-shadow: 0 0 10px #d4ac0d; padding: 0 5px; display: inline-block; transform: scale(1.2); }
            .secret-explanation { font-family: 'Fredoka', sans-serif; font-size: 1.2rem; line-height: 1.6; margin-bottom: 30px; }
            .secret-close { background: #8b0000; color: #fff; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 5px; cursor: pointer; font-family: 'Fredoka', sans-serif; transition: all 0.3s ease; }
            .secret-close:hover { background: #d4ac0d; transform: scale(1.05); }
            @media (max-width: 768px) { .secret-heading { font-size: 1.8rem; } .secret-heading .emphasis { font-size: 2rem; } .secret-explanation { font-size: 1rem; } }
          `
          )
          .appendTo("head");
      }
    }
    $("#secret-overlay").addClass("visible");
    $("body").css("overflow", "hidden");
    for (let i = 0; i < 200; i++) {
      window.createMagicParticle();
    } // Use window.createMagicParticle

    $(".secret-close, #secret-overlay")
      .off("click.secretClose")
      .on("click.secretClose", function (event) {
        // Added .off() and namespaced
        if (
          $(event.target).is("#secret-overlay") ||
          $(event.target).is(".secret-close")
        ) {
          $("#secret-overlay").removeClass("visible");
          setTimeout(() => {
            $("body").css("overflow", "");
            $("#secret-overlay").remove();
          }, 500);
        }
      });
    $(document)
      .off("keydown.secret")
      .on("keydown.secret", function (e) {
        // Added .off()
        if (e.key === "Escape") {
          $("#secret-overlay").removeClass("visible");
          setTimeout(() => {
            $("body").css("overflow", "");
            $(document).off("keydown.secret");
            $("#secret-overlay").remove();
          }, 500);
        }
      });
  }
};

window.setupBackToTopButton = function () {
  var backToTopBtn = $("#back-to-top-btn");
  if (!backToTopBtn.length) return; // Exit if button not present

  $(window)
    .off("scroll.backToTop")
    .on("scroll.backToTop", function () {
      // Added .off() and namespaced
      if ($(this).scrollTop() > 300) {
        backToTopBtn.fadeIn(300);
      } else {
        backToTopBtn.fadeOut(300);
      }
    });

  backToTopBtn.off("click").on("click", function (e) {
    // Added .off()
    e.preventDefault();
    $(this).addClass("levitating");
    var textElements = $("p, h1, h2, h3, h4, h5, h6, a").filter(function () {
      return !$(this).closest("").length; // Original filter was empty, assuming all text elements
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

// Call all setup functions on document ready
$(document).ready(function () {
  window.setupSmoothScrolling();
  window.setupEventCardHover();
  window.setupMembershipAnimations();
  window.setupContactForm();
  window.setupOwlChatbot();
  window.setupHeaderEyes();
  window.setupArtFormHover();
  window.setupHamburgerMenu();
  window.setupMagicTricks();
  window.setupBackToTopButton();
});
