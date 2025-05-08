$(document).ready(function () {
  // Fix the smooth scrolling code to handle empty "#" links
  $('a[href^="#"]').on("click", function (event) {
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

  $(".event-card").hover(
    function () {
      $(this).find("h3").css("color", "#c41212");
    },
    function () {
      $(this).find("h3").css("color", "");
    }
  );

  $(window).scroll(function () {
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

  // Contact form validation
  if ($("#contact-form").length > 0) {
    const contactForm = $("#contact-form");

    // Add error styling for form validation
    $("<style>")
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

    contactForm.on("submit", function (e) {
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
    $("#name, #email, #message").on("blur", function () {
      validateField($(this));
    });

    function validateForm() {
      let isValid = true;

      // Validate name field
      if (!validateField($("#name"))) {
        isValid = false;
      }

      // Validate email field
      if (!validateField($("#email"))) {
        isValid = false;
      }

      // Validate message field
      if (!validateField($("#message"))) {
        isValid = false;
      }

      return isValid;
    }

    function validateField($field) {
      const fieldId = $field.attr("id");
      const value = $field.val().trim();
      const $errorElement = $("#" + fieldId + "-error");
      const $formGroup = $field.closest(".form-group");

      $formGroup.removeClass("has-error");
      $errorElement.text("");

      // Different validation rules based on field type
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

      // Hide the response after 5 seconds for success messages
      if (type === "success") {
        setTimeout(function () {
          $formResponse.slideUp();
        }, 5000);
      }
    }
  }

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

  $(".owl-avatar").on("click", function () {
    $(".chat-window").fadeToggle(300);
    pulseOwl();

    $(".suggestion-tags").show();
  });

  $(".close-chat").on("click", function () {
    $(".chat-window").fadeOut(300);

    setTimeout(function () {
      $(".chat-messages .message:not(:first-child)").remove();
      $(".suggestion-tags").show();
    }, 300);
  });

  $(".send-btn").on("click", sendMessage);
  $(".chat-input input").on("keypress", function (e) {
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

  pulseOwl();

  setInterval(function () {
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

      setTimeout(function () {
        shakeOwl();
        scheduleNextShake();
      }, randomDelay);
    }

    $(".owl-chatbot").css({
      bottom: "20px",
      right: "20px",
      opacity: 1,
    });

    scheduleNextShake();
  }

  setupRandomMovements();

  $(".owl-chatbot").hover(
    function () {
      $(this).addClass("owl-hover");
    },
    function () {
      $(this).removeClass("owl-hover");
    }
  );

  $(".owl-avatar")
    .off("click")
    .on("click", function () {
      $(".owl-chatbot").stop(true, true).css({
        opacity: 1,
        right: "20px",
      });

      $(".chat-window").fadeToggle(300);
      pulseOwl();
    });

  $(".tag").on("click", function () {
    const query = $(this).data("query");

    const tagText = $(this).text();
    $(".chat-input input").val(tagText);
    sendMessage();

    $(".suggestion-tags").hide();
  });

  // Fix the magic eyes to properly follow mouse movement while also having random position on hover
  function setupHeaderEyes() {
    setTimeout(function () {
      $(".magic-eyes").css("transform", "translate(-50%, -50%) scale(1.2)");
      setTimeout(function () {
        $(".magic-eyes").css("transform", "translate(-50%, -50%)");
      }, 500);
    }, 1000);

    // Restore mouse movement tracking for pupils - this should not be removed
    $(document).mousemove(function (e) {
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

    function randomBlink() {
      const minDelay = 2000;
      const maxDelay = 6000;
      const randomDelay =
        Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

      setTimeout(function () {
        $(".magic-eyes .eye").addClass("blinking");

        setTimeout(function () {
          $(".magic-eyes .eye").removeClass("blinking");
        }, 500); // Increased from 200ms to 500ms for more visible blinking

        randomBlink();
      }, randomDelay);
    }

    setTimeout(function () {
      $(".magic-eyes .eye").addClass("blinking");
      setTimeout(function () {
        $(".magic-eyes .eye").removeClass("blinking");
      }, 500); // Increased from 200ms to 500ms
    }, 1000);

    randomBlink();
  }

  setupHeaderEyes();

  $(".art-form").hover(
    function () {
      $(this).find(".art-icon").addClass("active");
    },
    function () {
      $(this).find(".art-icon").removeClass("active");
    }
  );

  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();

    if ($("#magic-arts").length) {
      var sectionPosition = $("#magic-arts").offset().top;

      if (scrollPosition > sectionPosition - 500) {
        $(".art-form").each(function (i) {});
      }
    }
  });

  // Hamburger menu functionality
  $(".hamburger-menu").on("click", function () {
    $(this).toggleClass("active");
    $(".main-nav").toggleClass("open");
  });

  // Close mobile menu when clicking a link
  $(".main-nav a").on("click", function () {
    $(".hamburger-menu").removeClass("active");
    $(".main-nav").removeClass("open");
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".hamburger-menu").length &&
      !$(event.target).closest(".main-nav").length &&
      $(".main-nav").hasClass("open")
    ) {
      $(".hamburger-menu").removeClass("active");
      $(".main-nav").removeClass("open");
    }
  });

  // Magic trick - flip the entire site upside down
  $("#flip-trick").on("click", function (e) {
    e.preventDefault();

    // Add magic sparkle effect
    const sparkleDuration = 2000;

    // Create more sparkles - increased from 50 to 150
    for (let i = 0; i < 150; i++) {
      createSparkle();
    }

    // Wait for sparkles, then flip
    setTimeout(function () {
      // Toggle the upside-down class on the body
      $("body").toggleClass("magic-upside-down");

      // Add a message that appears
      if ($("body").hasClass("magic-upside-down")) {
        $("<div>", {
          class: "magic-message",
          html: "You've been magically flipped! <a href='#' id='restore-magic'>Restore</a>",
        }).appendTo("body");

        // Add listener to restore link
        $("#restore-magic").on("click", function (e) {
          e.preventDefault();
          $("body").removeClass("magic-upside-down");
          $(".magic-message").remove();
        });
      } else {
        $(".magic-message").remove();
      }
    }, sparkleDuration);

    // Function to create a single sparkle
    function createSparkle() {
      const sparkle = $("<div>", { class: "magic-sparkle" });

      // Random position across the screen
      const xPos = Math.random() * window.innerWidth;
      const yPos = Math.random() * window.innerHeight;

      // More varied random size - increased max size and variability
      const size = Math.random() * 15 + 3;

      // Expanded color palette for more variety
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

      // Random sparkle shapes - create either circle, star or diamond shapes
      let shape = "circle";
      const shapeRandom = Math.random();
      let rotation = Math.random() * 360;
      let extraCSS = {};

      if (shapeRandom > 0.7) {
        // Star shape using clip-path
        shape = "star";
        extraCSS = {
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          backgroundColor: "transparent",
          border: `2px solid ${color}`,
        };
      } else if (shapeRandom > 0.4) {
        // Diamond shape
        shape = "diamond";
        extraCSS = {
          transform: `rotate(${rotation}deg)`,
          backgroundColor: "transparent",
          border: `2px solid ${color}`,
        };
      }

      // Apply different animation based on shape
      const animationDuration = Math.random() * 800 + 600;
      const animationDelay = Math.random() * 300;

      sparkle.css({
        left: xPos + "px",
        top: yPos + "px",
        width: size + "px",
        height: size + "px",
        backgroundColor: color,
        borderRadius:
          shape === "circle" ? "50%" : shape === "diamond" ? "0%" : "",
        opacity: 0,
        position: "fixed",
        zIndex: 9999,
        pointerEvents: "none",
        animation: `sparkle ${animationDuration}ms ${animationDelay}ms forwards`,
        boxShadow: `0 0 ${size / 3}px ${color}`,
        ...extraCSS,
      });

      // Add to body
      sparkle.appendTo("body");

      // Animate and remove after a slightly random duration
      setTimeout(function () {
        sparkle.remove();
      }, animationDuration + animationDelay);
    }
  });

  // Add event handler for the "Tell me the Secret!" link
  $("#secret-trick").on("click", function (e) {
    e.preventDefault();
    showSecretOverlay();
  });

  // Function to show the secret overlay
  function showSecretOverlay() {
    // Create overlay if it doesn't exist
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
            <button class="secret-close content-btn">I understand!</button>
          </div>
        `,
      });

      $("body").append(overlay);

      // Add CSS for overlay
      $("<style>")
        .prop("type", "text/css")
        .html(
          `
          .secret-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          
          .secret-overlay.visible {
            opacity: 1;
          }
          
          .secret-content {
            max-width: 900px;
            padding: 40px;
            text-align: center;
            color: #fff;
            background-color: rgba(20, 20, 20, 0.85);
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(212, 172, 13, 0.5);
            transform: scale(0.9);
            transition: transform 0.5s ease;
            margin: 20px;
          }
          
          .secret-overlay.visible .secret-content {
            transform: scale(1);
          }
          
          .secret-heading {
            font-family: 'Lobster Two', cursive;
            font-size: 2.5rem;
            line-height: 1.4;
            margin-bottom: 30px;
            color: #d4ac0d;
          }
          
          .secret-heading .emphasis {
            font-size: 2.8rem;
            font-weight: bold;
            color: #fff;
            text-shadow: 0 0 10px #d4ac0d;
            padding: 0 5px;
            display: inline-block;
            transform: scale(1.2);
          }
          
          .secret-explanation {
            font-family: 'Fredoka', sans-serif;
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          
          .secret-close {
            background: #8b0000;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 1.1rem;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Fredoka', sans-serif;
            transition: all 0.3s ease;
          }
          
          .secret-close:hover {
            background: #d4ac0d;
            transform: scale(1.05);
          }
          
          @media (max-width: 768px) {
            .secret-heading {
              font-size: 1.8rem;
            }
            
            .secret-heading .emphasis {
              font-size: 2rem;
            }
            
            .secret-explanation {
              font-size: 1rem;
            }
          }
        `
        )
        .appendTo("head");
    }

    // Show the overlay with animation
    $("#secret-overlay").addClass("visible");

    // Disable scrolling on body
    $("body").css("overflow", "hidden");

    // Add magical sparkles effect
    for (let i = 0; i < 100; i++) {
      createMagicParticle();
    }

    // Set up close button and click outside to close
    $(".secret-close, #secret-overlay").on("click", function (event) {
      if (
        $(event.target).is("#secret-overlay") ||
        $(event.target).is(".secret-close")
      ) {
        $("#secret-overlay").removeClass("visible");
        setTimeout(() => {
          $("body").css("overflow", "");
          $("#secret-overlay").remove(); // Remove the element completely
        }, 500);
      }
    });

    // Also close on ESC key
    $(document).on("keydown.secret", function (e) {
      if (e.key === "Escape") {
        $("#secret-overlay").removeClass("visible");
        setTimeout(() => {
          $("body").css("overflow", "");
          $(document).off("keydown.secret");
          $("#secret-overlay").remove(); // Remove the element completely
        }, 500);
      }
    });
  }

  function createMagicParticle() {
    const particle = $("<div>", { class: "magic-particle" });

    // Random position near the emphasized words
    const centerX = $(window).width() / 2;
    const centerY = $(window).height() / 2;
    const radius = Math.min($(window).width(), $(window).height()) * 0.4;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;

    const xPos = centerX + Math.cos(angle) * distance;
    const yPos = centerY + Math.sin(angle) * distance;

    // Random size
    const size = Math.random() * 8 + 2;

    // Gold/red color palette
    const colors = [
      "#d4ac0d",
      "#ffd700",
      "#ffcc00",
      "#8b0000",
      "#ff9800",
      "#fff",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random duration for animation
    const duration = Math.random() * 2000 + 1000;

    // Set CSS
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

    // Append to body
    $("body").append(particle);

    // Add animation
    particle.animate(
      {
        opacity: 1,
        left: xPos + (Math.random() * 100 - 50) + "px",
        top: yPos + (Math.random() * 100 - 50) + "px",
      },
      duration / 2,
      function () {
        $(this).animate(
          {
            opacity: 0,
          },
          duration / 2,
          function () {
            $(this).remove();
          }
        );
      }
    );
  }
});

// Add CSS rules to the document
$("<style>")
  .prop("type", "text/css")
  .html(
    `
    .magic-upside-down {
      transform: rotate(180deg);
      transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    
    .magic-sparkle {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
    }
    
    @keyframes sparkle {
      0% { 
        opacity: 0;
        transform: scale(0) rotate(0deg); 
      }
      20% {
        opacity: 1;
        transform: scale(1.2) rotate(80deg);
      }
      50% { 
        opacity: 1; 
        transform: scale(1) rotate(180deg);
      }
      80% {
        opacity: 0.8;
        transform: scale(0.9) rotate(240deg);
      }
      100% { 
        opacity: 0; 
        transform: scale(0) rotate(360deg);
      }
    }
    
    .magic-message {
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #d4ac0d;
      color: #111;
      padding: 10px 20px;
      border-radius: 20px;
      font-family: 'Lobster Two', cursive;
      font-size: 18px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
    }
    
    /* Add counter-rotation to make text readable when page is flipped */
    body.magic-upside-down .magic-message {
      transform: translateX(-50%) rotate(180deg);
    }
    
    .magic-message a {
      color: #8b0000;
      text-decoration: underline;
      font-weight: bold;
    }
  `
  )
  .appendTo("head");
